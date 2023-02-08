import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';
import { SelectorOptionsService } from 'src/app/services/selector-options.service';

@Component({
  selector: 'app-general-info-form-page-ii',
  templateUrl: './general-info-form-page-ii.component.html',
  styleUrls: ['./general-info-form-page-ii.component.scss']
})
export class GeneralInfoFormPageIIComponent implements OnInit {


  @Input() performance?: FormGroup;
  @Input() engine?: FormGroup;
  @Input() chassis?: FormGroup;
  previousPerformanceValues?: any;
  previousEngineValues?: any;
  previousChassisValues?: any;
  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()



  constructor(
    private selectorOptionsService: SelectorOptionsService,
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }


  ngOnInit(): void {

    this.scrollService.scrollToTheTop()
    this.previousPerformanceValues = this.performance?.value;
    this.previousEngineValues = this.engine?.value;
    this.previousChassisValues = this.chassis?.value;


  }

  get fuels() {
    return this.selectorOptionsService.fuelOptions;
  }

  get isEngineNotElectric() {
    return this.performance?.value.fuel !=='Electric';
  }

  get gearboxes() {
    return ['automatic','semi-automatic','manual']
  }

  get wheeldrives() {
    return [
      'Front wheel drive',
      'Rear wheel drive',
      'All wheel drive (4x4)'
    ]
  }


  get emissionClasses() {
    return [
      'Euro 1',
      'Euro 2',
      'Euro 3',
      'Euro 4',
      'Euro 5',
      'Euro 6'
    ]
  }

  get emissionStickers() {
    return [
      '1 (none)',
      '2 (red)',
      '3 (yellow)',
      '4 (green)'
    ]
  }






  goBack() {

    this.performance?.patchValue(this.previousPerformanceValues);
    this.engine?.patchValue(this.previousEngineValues);
    this.chassis?.patchValue(this.previousChassisValues);

    this.changeStep.emit('back');
  }

  goForward() {

    if (this.performance?.valid && this.engine?.valid && this.chassis?.valid) {
      this.changeStep.emit('forward');
    } else {
      this.performance?.markAllAsTouched();
      this.engine?.markAllAsTouched();
      this.chassis?.markAllAsTouched();

      this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
    }
  }

  // private touchControls(form:any) {
  //   if (form){
  //     Object.keys(form.controls).forEach(field => { // {1}
  //       const control = form?.get(field);            // {2}
  //       control?.markAsTouched({ onlySelf: true });       // {3}
  //     });
  //   }
  // }



  // private scrollToFirstInvalidControl() {
  //   let form = document.getElementById('formId'); // <-- your formID
  //   let firstInvalidControl = form?.getElementsByClassName('ng-invalid')[0];
  //   firstInvalidControl?.scrollIntoView();
  //   (firstInvalidControl as HTMLElement)?.focus();
  // }



  capitalizeFirstLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  checkboxText(checkboxName:any) {
    return  Checkbox[checkboxName as keyof typeof Checkbox];
  }
}
