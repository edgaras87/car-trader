import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';


@Component({
  selector: 'app-equipment-info-form-page-iv',
  templateUrl: './equipment-info-form-page-iv.component.html',
  styleUrls: ['./equipment-info-form-page-iv.component.scss']
})
export class EquipmentInfoFormPageIvComponent implements OnInit {

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

  get multimediaFeatureCheckboxes() {
    return [
      'radio',
      'dabRadio',
      'cdPlayer',
      'tv',
      'navigationSystem',
      'soundSystem',
    ]
  }


  get handlingAndControlFeatureCheckboxes() {
    return [
      'touchScreen',
      'voiceControl',
      'multifunctionSteeringWheel',
      'handsFreeKit',
    ]
  }

  get connectivityAndInterfacesFeatureCheckboxes() {
    return [
      'usbPort',
      'bluetooth',
      'appleCarPlay',
      'androidAuto',
      'wlanWifiHotspot',
      'integratedMusicStreaming',
      'inductionChargingForSmartphones',
    ]
  }


  get cockpitDisplayFeatureCheckboxes() {
    return [
      'onboardComputer',
      'headupDisplay',
      'digitalCockpit',
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

