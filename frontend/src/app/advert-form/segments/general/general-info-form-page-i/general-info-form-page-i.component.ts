
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ScrollService } from 'src/app/services/scroll.service';
import { SelectorOptionsService } from 'src/app/services/selector-options.service';
import { SegmentsDirections } from 'src/app/enums/types/directions';

@Component({
  selector: 'app-general-info-form-page-i',
  templateUrl: './general-info-form-page-i.component.html',
  styleUrls: ['./general-info-form-page-i.component.scss']
})
export class GeneralInfoFormPageIComponent implements OnInit  {

  @Input() form?: FormGroup;
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>();

  constructor(
    private selectorOptionsService: SelectorOptionsService,
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }


  get info() { return this.form?.value }


  get years() {
    return this.selectorOptionsService.yearOptions
  }

  get months() {
    return this.selectorOptionsService.monthOptions
  }

  get bodies() {
    return this.selectorOptionsService.bodyOptions
  }

  get doors() {
    return this.selectorOptionsService.doorOptions
  }



  goBack() {

    this.form?.patchValue(this.previousFormCotrolValues);

    this.changeStep.emit('back');
  }

  goForward() {

    if (this.form?.valid) {
      this.changeStep.emit('forward');
    } else {
      this.form?.markAllAsTouched();
      this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
    }
  }


  // merge or fork changes???
  setProducedTimestamp() {
    const year = (this.form?.value.year) ? parseInt(this.form?.value.year) : null;
    const month = (this.form?.value.month) ? parseInt(this.form?.value.month) : null;

    if(typeof(year) == 'number' && typeof(month) == 'number') {
      this.form?.get('produced')?.setValue(new Date(year, month).valueOf())
    } else {
      this.form?.get('produced')?.setValue(null);
    }

  }















}

