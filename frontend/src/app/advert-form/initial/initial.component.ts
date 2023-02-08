import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationPaths } from 'src/app/enums/navigation-paths.enum';
import { Specification } from 'src/app/interfaces/specification';

import { AdvertService } from 'src/app/services/advert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { SelectorOptionsService } from 'src/app/services/selector-options.service';
import { SpecificationService } from 'src/app/services/specification.service';
import { IsNumber } from 'src/app/validators/is-number.validator';

import { MileageMinMax } from 'src/app/validators/milieage-min-max.validator';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit, OnDestroy  {

  @Input() mainForm?: FormGroup;
  initialized:boolean = false;


  private _specifications:Specification[] = []
  private _specificationOptions: Specification[] = []
  private _descriptionOptions: string[] = []

  private _doorOptions = this.selectorOptionsService.doorOptions;
  private _bodyOptions = this.selectorOptionsService.bodyOptions;
  private _fuelOptions = this.selectorOptionsService.fuelOptions;


  initialInfoForm: FormGroup = this._fb.group({
    brand: null,
    model: [{value:null, disabled:true}],
    year: null,
    month: null,
    fuel: null,
    door: null,
    body: null,
    description: null,
    specId: null,
    power: null,
    mileage: [null, [MileageMinMax, IsNumber,  Validators.required]],


  })




  constructor(
    private _fb: FormBuilder,
    private selectorOptionsService: SelectorOptionsService,
    private specificationService: SpecificationService,
    private advertService: AdvertService,
    private notifier: NotificationService,
    private router: Router,
    private scrollService: ScrollService,
    private el: ElementRef
  ) {}


  ngOnDestroy(): void {
    (this.initialized)
      ? localStorage.removeItem('initialForm')
      : localStorage.setItem('initialForm', JSON.stringify(this.initialInfoForm?.value));
  }

  ngOnInit(): void {
    this.scrollService.scrollToTheTop()
    this.formRestore();
  }

  private formRestore() {


    let savedFormValues = localStorage.getItem('initialForm')
    if (savedFormValues) {
      let savedForm = JSON.parse(savedFormValues);

      this.filterSpecificationOptions();

      (savedForm.brand && savedForm.model && savedForm.year && (savedForm.month || savedForm.month == 0))?
      this.specificationService.specifications({
          brand: savedForm.brand,
          model:savedForm.model,
          year:savedForm.year,
          month:savedForm.month
        }).subscribe(specifications => {
          this._specifications = specifications;
          this.initialInfoForm.patchValue(savedForm, { emitEvent: false })
          this.additionalInfoSelected(null);

      })
      : this.initialInfoForm.patchValue(savedForm, { emitEvent: false });
    }
  }


  // all forms controlers values accessors
  get info() {
    return this.initialInfoForm?.value;
  }

  // main info accessors
  get brands() {
    return this.selectorOptionsService.brandOptions  }

  get models() {
    return this.selectorOptionsService.modelOptions(this.initialInfoForm?.value.brand)
  }

  get years() {
    return this.selectorOptionsService.yearOptions
  }

  get months() {
    return this.selectorOptionsService.monthOptions;
  }


  deselectModel() {

    const modelControll = this.initialInfoForm.get('model');

    // disable vehicle model selection if vehicle brand is not selected
    (this.initialInfoForm.value.brand) ? modelControll?.enable() : modelControll?.disable();

    //deselect model
    modelControll?.setValue(null)
  }


  get mileageControl() {
    return this.initialInfoForm.get('mileage')
  }

  setMileageControl(input: string) {

    const mileage = this.initialInfoForm.get('mileage');
    if (mileage){
      const parsedNumber = (input) ? parseInt(input.toString().replaceAll(',','')) : null;
      mileage.setValue(parsedNumber , { emitEvent: false, onlySelf: true });
    }
  }


  // additional info accessors
  get doors() {
    return this._doorOptions
  }

  get bodies() {
    return this._bodyOptions;
  }

  get fuels() {
    return this._fuelOptions;
  }


  get desriptions() {
    return this._descriptionOptions
  }



  get specifications() {
    return this._specificationOptions
  }



  get showDoorOptions() {
    return !!this.info.brand && !!this.info.model && !!this.info.year && (!!this.info.month || this.info.month == 0);
  }


  get showBodyOptions() {
    return !!this.info.door
  }

  get showFuelOptions() {
    return !!this.info.body
  }

  get showDescriptionOptions() {
    return !!this.info.fuel && this._descriptionOptions.length > 0
  }

  get showSpecificationOptions() {
    return !!this.info.description
  }

  get showMotorPower() {
    return !!this.info.fuel;
  }

  get showProceedButton() {
    return !!this.info.specId || !!this.info.power
  }





  // UI functions
  mainInfoSelected() {

    // deselecting
    this.initialInfoForm?.patchValue({door:null,body:null, fuel:null, description:null,specId:null})

    // requesting specification list by selected characteristics (if all characteristics is selected)
    if(this.info.brand && this.info.model && this.info.year && (this.info.month || this.info.month == 0)){
      this.specificationService.specifications({
        brand: this.info.brand,
        model: this.info.model,
        year: this.info.year,
        month: this.info.month
      }).subscribe(specifications => {
          this._specifications = specifications;
          this.filterSpecificationOptions();
      });
    }

  }

  additionalInfoSelected(event:any) {

    // deselecting
    if (event === 'door'){
      this.initialInfoForm?.patchValue({body:null, fuel:null, description:null, specId:null});
    }
    if (event === 'body'){
      this.initialInfoForm?.patchValue({fuel:null, description:null, specId:null});
    }
    if (event === 'fuel'){
      this.initialInfoForm?.patchValue({description:null, specId:null});
    }
    if (event === 'description'){
      this.initialInfoForm?.patchValue({specId:null});
    }

    // refilter
    this.filterSpecificationOptions(this.info.door, this.info.body, this.info.fuel, this.info.description);
  }

  start() {

    if (this.initialInfoForm.valid) {
      /**
       * patching order is important !!!.
       * because for e.g. engine power will be not null if it is choosen from specification database,
       * so if we fetch toGeneralInfo() secondly where engine power will can be null because we dont have to put it manualy
       * it will overwrite it with null
       * (later, maybe try to change with undefined instead of null )
       */
      this.mainForm?.get('generalInfo')?.patchValue(this.toGeneralInfo());

      if (this.initialInfoForm.value.specId){
        let spec = this.specifications.find((s: any) => s.id === this.initialInfoForm.value.specId)
        if (spec) this.mainForm?.get('generalInfo')?.patchValue(spec);
      }

      this.advertService.create(this.mainForm?.value).subscribe(
        {
          next: (v) => {
            this.initialized = true;
            // this.initialInfo.emit(v);
            // this.changeStep.emit();
            this.router.navigate([NavigationPaths.AD_EDIT, v.id])
            this.notifier.onSuccess('You have successfully created new advertisement')

          }
        }
      );


    } else {
      this.initialInfoForm?.markAllAsTouched();
      this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
    }

  }

  // private functions


  /**
   * Filter specifications optios by provided characteristics.
   * Also simontainiausly filtering options for: doors, body, fuels, descriptions.
   *
   * @param doors
   * @param body
   * @param fuel
   * @param selectedDescription
   */
  private filterSpecificationOptions(doors?:string, body?:string, fuel?:string, selectedDescription?:string) {

    const doorSet:Set<string> = new Set();
    const bodySet:Set<string> = new Set();
    const fuelSet:Set<string> = new Set();
    const descriptionSet:Set<string> = new Set();


    if(this._specifications){
      this._specificationOptions = this._specifications.filter((spec:any) => {


        doorSet.add(spec.general.doors);
        if (doors && spec.general.doors != doors) return false


        bodySet.add(spec.general.body);
        if (body && spec.general.body != body) return false



        fuelSet.add(spec.performance.fuel);
        if (fuel && spec.performance.fuel != fuel) return false



        let description = `${spec.general.generation} ${spec.general.modification}`;
        descriptionSet.add(description);
        if (selectedDescription && description !== selectedDescription) return false

        return true
      });
    }

    this._doorOptions = (doorSet.size>0) ? [...doorSet].sort() : this.selectorOptionsService.doorOptions;
    this._bodyOptions = (bodySet.size>0) ? [...bodySet].sort() : this.selectorOptionsService.bodyOptions;
    this._fuelOptions = (fuelSet.size>0) ? [...fuelSet].sort() : this.selectorOptionsService.fuelOptions;
    this._descriptionOptions =  [...descriptionSet];

  }

  private toGeneralInfo() {

    return {
      general: {
        brand: this.info.brand,
        model: this.info.model,
        doors: this.info.door,
        body: this.info.body,
        produced: new Date(this.info.year, this.info.month).valueOf(),
      },
      engine: {
        power: this.info.power
      },
      performance: {
        fuel: this.info.fuel
      },
      condition: {
        mileage: this.info.mileage
      }
    }
  }


}
