import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';


@Component({
  selector: 'app-equipment-info-form-page-ii',
  templateUrl: './equipment-info-form-page-ii.component.html',
  styleUrls: ['./equipment-info-form-page-ii.component.scss']
})
export class EquipmentInfoFormPageIiComponent implements OnInit {


  @Input() form?: FormGroup;
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }

  get info() {
    return this.form?.value
  }

  checkboxText(checkboxName:any) {
    return  Checkbox[checkboxName as keyof typeof Checkbox];
  }


  get assistenceCheckboxes() {
    return [
      'abs',
      'esp',
      'asr',
      'hillStart',
      'fatigueWarning',
      'laneChange',
      'blindSpot',
      'dimmingMirror',
      'nightVision',
      'emergencyBrake',
      'emergencyCall',
      'trafficSignRecog',
      'speedLimit',
      'distanceWarning'
    ]
  }

  get cruiseOptions() {
    return ['Adaptive Cruise Control', 'Cruise Control']
  }



  get airbagsOptions() {
    return [
      'Driver Airbag',
      'Front Airbag',
      'Front and Side Airbag',
      'Front and Side and More Airbag'
    ]
  }

  get airbagsCheckboxes() {
    return [
      'isofixChild',
      'isofixPassenger'
    ]
  }

  get headlightsOptions() {
    return [
      'Bi-xenon headlights',
      'Laser headlights',
      'Led headlights',
      'Xenon headlights'
    ]
  }

  get headlightCheckboxes() {
    return [
      'headlightsWasher',
    ]
  }

  get protectionCheckboxes() {
    return [
      'alarm',
      'immobilizer',
    ]
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



}
