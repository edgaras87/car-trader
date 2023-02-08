
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';
import { SelectorOptionsService } from 'src/app/services/selector-options.service';

@Component({
  selector: 'app-general-info-form-page-iii',
  templateUrl: './general-info-form-page-iii.component.html',
  styleUrls: ['./general-info-form-page-iii.component.scss']
})
export class GeneralInfoFormPageIiiComponent implements OnInit {


  @Input() condition?: FormGroup;
  previousConditionValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  constructor(
    private selectorOptionsService: SelectorOptionsService,
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.scrollService.scrollToTheTop()
    this.previousConditionValues = this.condition?.value;
  }

  private _ownerCountOption = this.ownerNumberOptions();


  get owners() {
    return this._ownerCountOption;
  }

  get years() {
    return this.selectorOptionsService.inspectionYearOptions
  }

  get months() {
    return this.selectorOptionsService.monthOptions
  }



  goBack() {

    this.condition?.patchValue(this.previousConditionValues);

    this.changeStep.emit('back');
  }

  goForward() {

    if (this.condition?.valid) {

      this.changeStep.emit('forward');
    } else {
      if (this.condition){
        this.condition?.markAllAsTouched();
        this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
      }
    }
  }





  private ownerNumberOptions() {
    let owners: number[] = []
    let n = 10
    for (let i = 0; i<n;i++)
      owners.push((i+1))
    return owners
  }

  checkboxText(checkboxName:any) {
    return  Checkbox[checkboxName as keyof typeof Checkbox];
  }


  setInspectionTimestamp() {
    const year = parseInt(this.condition?.value.inspectionYearUntil);
    const month = this.condition?.value.inspectionMonthUntil;

    if(typeof(year) == 'number' && typeof(month) == 'number') {
      this.condition?.get('inspectionUntil')?.setValue(new Date(year, month).valueOf())
    } else {
      this.condition?.get('inspectionUntil')?.setValue(null);
    }

  }


}
