import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';


@Component({
  selector: 'app-equipment-info-form-page-v',
  templateUrl: './equipment-info-form-page-v.component.html',
  styleUrls: ['./equipment-info-form-page-v.component.scss']
})
export class EquipmentInfoFormPageVComponent implements OnInit {


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


  get breakdownKitOptions() {
    return ['Emergency tyre','Emergency tyre repair kit','Spare tyre']
  }

  get wheelsFeatureCheckboxes() {
    return [
      "alloyWheels",
      "summerTyres",
      "winterTyres",
      "allSeasonTyres",
      "tyrePressureMonitoring",
    ]
  }

  get extraSpecialFeatureCheckboxes() {
    return [
      "winterPackage",
      "smokerPackage",
      "sportsPackage",
      "sportsSuspension",
      "airSuspension",
      "cargoBarrier",
      "skiBag",
      "sunroof",
      "panoramicRoof",
      "roofRack",
      "disabledAccessible",
      "taxi",
    ]
  }

  get trailerCouplingOptions() {
    return ['Trailer coupling, detachable','Trailer coupling, swiveling','Trailer coupling fix']
  }

  goBack() {
    this.form?.patchValue(this.previousFormCotrolValues);
    this.changeStep.emit('back');
  }


  goForward() {

    if (this.form?.valid) {
      this.form?.get('completed')?.setValue(true);
      this.changeStep.emit('forward');
    } else {
      this.form?.markAllAsTouched();
      this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
    }
  }

}
