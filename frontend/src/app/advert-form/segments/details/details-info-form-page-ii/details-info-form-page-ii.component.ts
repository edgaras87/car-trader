import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-details-info-form-page-ii',
  templateUrl: './details-info-form-page-ii.component.html',
  styleUrls: ['./details-info-form-page-ii.component.scss']
})
export class DetailsInfoFormPageIiComponent implements OnInit {


  @Input() form?: FormGroup;
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()



  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }


  get info() {
    return this.form?.value;
  }


  goBack() {
    this.form?.patchValue(this.previousFormCotrolValues);
    this.changeStep.emit('back');
  }


  goForward() {

    if (this.form?.valid) {
      this.changeStep.emit('forward');
    } else {
      if (this.form){
        this.form?.markAllAsTouched();
        this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
      }
    }
  }


}
