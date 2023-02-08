import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';


@Component({
  selector: 'app-equipment-info-form-page-iii',
  templateUrl: './equipment-info-form-page-iii.component.html',
  styleUrls: ['./equipment-info-form-page-iii.component.scss']
})
export class EquipmentInfoFormPageIiiComponent implements OnInit {

  @Input() form?: FormGroup;
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  checkboxText(checkboxName:any) {
    return  Checkbox[checkboxName as keyof typeof Checkbox];
  }


  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ){}

  ngOnInit(): void {

    this.scrollService.scrollToTheTop();

    this.previousFormCotrolValues = this.form?.value;
    this.initialCheckboxStateSet('parkingAssist',this.acousticParkingAssist);
    this.initialCheckboxStateSet('camera',this.visualParkingAssist);
    this.initialCheckboxStateSet('seatsHeated',this.heatedSeats);
    this.initialCheckboxStateSet('seatsElectricAdjustable',this.elSeats);

  }

  private initialCheckboxStateSet(checkboxName:string,checkboxItems:any[]) {
    const checkArray: FormArray = this.form?.get(checkboxName) as FormArray;
    checkArray.controls.forEach((arrayItem: any) => {
      checkboxItems.map(item => {
        if (item.value == arrayItem.value){
          item.checked=!item.checked}
        });
    });
  }


  get info() {
    return this.form?.value
  }




  get climatisationOptions() {
    return [
      'No climatisation',
      'A/C (man.)',
      'Automatic air conditioning',
      'Automatic climatisation, 2 zones',
      'Automatic climatisation, 3 zones',
      'Automatic climatisation, 4 zones',

    ]
  }

  get climatisationCheckboxes() {
    return [
      'auxiliaryHeating',
      'heatedWindshield',
      'heatedSteeringWheel',
    ]
  }



  // assistance
  get assistentCheckboxes() {
    return [
      'selfSteering'
    ]
  }

  acousticParkingAssist = [
    {value: 'Front', checked:false},
    {value: 'Rear', checked:false}
  ]

  onAcousticParkingAssistSelect(e: any) {
    this.multiCheck(e,'parkingAssist');
  }

  visualParkingAssist = [
    {value: 'Camera', checked:false},
    {value: '360° Camera', checked:false}
  ]


  // seats
  heatedSeats = [
    {value: 'Front', checked:false},
    {value: 'Back', checked:false}
  ]

  onHeatedSeatsSelect(e:any) {
    this.multiCheck(e,'seatsHeated');
  }

  elSeats = [
    {value: 'Front', checked:false},
    {value: 'Back', checked:false}
  ]

  onElSeatsSelect(e:any) {
    this.multiCheck(e,'seatsElectricAdjustable');
  }

  onVisualParkingAssistSelect(e:any) {

    this.visualParkingAssist.forEach(parking => {
      if (parking.value == e.target.value)
        parking.checked=!parking.checked
      else
        parking.checked = false
    });

    // const checkArray: FormArray = (this.form?.get('comfort') as FormGroup).get('camera') as FormArray;
    const checkArray: FormArray = this.form?.get('camera') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));

      let i: number = 0;
      checkArray.controls.forEach( (item: any) => {
        if (item.value != e.target.value) {

          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    } else {
      let i: number = 0;
      checkArray.controls.forEach( (item: any) => {
        if (item.value == e.target.value) {

          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  private multiCheck(e:any, checkboxName:string) {
    // const checkArray: FormArray = (this.form?.get('comfort') as FormGroup).get(checkboxName) as FormArray;
    const checkArray: FormArray = this.form?.get(checkboxName) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get seatFeatureCheckboxes() {
    return [
      "seatsSport",
      "armRest",
      "seatsMassage",
      "seatsMemory",
      "seatsVentilation",
      "seatsFoldflat",
    ]
  }


  get comfortFeatureCheckboxes() {
    return [
      "electricWindow",
      "electricMirror",
      "electricTailgate",
      "centralLocking",
      "keyless",
      "lightSensor",
      "rainSensor",
      "powerAssistSteering",
      "leatherSteeringWheel",
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
