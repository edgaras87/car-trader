import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdvertService } from 'src/app/services/advert.service';
import { MenuDirections, SegmentsDirections, Steps } from 'src/app/enums/types/directions';
import { HttpStatusCode } from '@angular/common/http';
import { NavigationService } from 'src/app/services/navigation.service';
import { Advert } from 'src/app/interfaces/advert';



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  private currentStepBs!: BehaviorSubject<MenuDirections>;
  public currentStep$!: Observable<MenuDirections>;

  public mainForm: FormGroup = this.initAdvertForm();

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private advertService: AdvertService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['id']) {
        this.currentStepBs = new BehaviorSubject<MenuDirections>('formSectionsMenu')



        /**
         * forms data is saved to localstorage everytime then advert menu is left.
         * if form data is saved to db, localstorage is cleaned.
         * here we checking for latest form data, if localstorage is empty that means lates data is in db.
         */


        const lastFormState = localStorage.getItem(params['id']);
        //(lastFormState) ? console.log('loading from localstorage') : console.log('loading from db');

        (lastFormState)
          ? this.formInit(JSON.parse(lastFormState))
          : this.advertService.getById(params['id']).subscribe(


              {
                next: (advert) => { this.formInit(advert) },
                error: (e) => {
                  // if advert not found redirect to previous or homepage
                  if (e.error?.status === HttpStatusCode.NotFound){
                    this.navigationService.backToWhereWeLeft();
                    throw e;
                  }
                }
              }


            );


      } else {
        this.currentStepBs = new BehaviorSubject<MenuDirections>('initialInfo');
      }
      this.currentStep$ = this.currentStepBs.asObservable();
    });

  }

  private setYearMonthOfProducedFromTimestamp() {
    const produced = this.mainForm?.value.generalInfo?.general?.produced
    if (produced) {
      const producedDate = new Date(produced);
      if(producedDate) {
        this.mainForm?.get('generalInfo')?.get('general')?.get('year')?.setValue(producedDate.getFullYear().toString());
        this.mainForm?.get('generalInfo')?.get('general')?.get('month')?.setValue(producedDate.getMonth());
      }
    }
  }

  private setYearMonthOfInspectionFromTimestamp() {
    const inspection = this.mainForm?.value.generalInfo?.condition?.inspectionUntil
    if (inspection) {
      const inspectionDate = new Date(inspection);
      if(inspectionDate) {
        this.mainForm?.get('generalInfo')?.get('condition')?.get('inspectionYearUntil')?.setValue(inspectionDate.getFullYear().toString());
        this.mainForm?.get('generalInfo')?.get('condition')?.get('inspectionMonthUntil')?.setValue(inspectionDate.getMonth());
      }
    }
  }



  getNestedForm(...controllerNames:string[])  {
    return this.nestedForm(this.mainForm, ...controllerNames);
  }

  private nestedForm(form?:FormGroup, ...controllerNames:string[]): FormGroup|undefined  {

    let result = null;
    let newForm = form;

    if (controllerNames.length > 0){
      const controllerName = controllerNames.shift();

      if (controllerName)  {
        newForm = form?.get(controllerName) as FormGroup;
      }
      // else {
      //   form = undefined;
      // }
    }

    result = (!controllerNames.length) ? newForm : this.nestedForm(newForm, ...controllerNames);

    return result;




  }


  formInit(initial: Advert) {

    if(initial) {
      this.mainForm.patchValue(initial);
      this.setYearMonthOfProducedFromTimestamp();
      this.setYearMonthOfInspectionFromTimestamp();
    }

  }


  /**
   * Controller that indicates of partial form completion.
   * @param sectionGroupName - section group name (in other words part of form)
   */
  private setSectionGroupCompleted(sectionGroupName:string) {
    const completedControl = this.mainForm.get(sectionGroupName)?.get('completed');
    if (!completedControl?.value)
      completedControl?.setValue(true);
  }


  /**
   * Main navigation function between Advert Form sections (create/edit form).
   * Here is handeled navigation steps between:
   *  (formMenuSection -> any segment)
   * Navigation steps between:
   *  (any segment -> formMenuSection),
   *  (any segment -> any segment),
   * is handeled by chengeStepInMenu(direction: MenuDirections)
   * @param direction - indicates to which form section to navigate.
   */
  chengeStepInMenu(direction: MenuDirections) {
    this.currentStepBs.next(direction);
  }

  /**
   * Main navigation function between Advert Form sections (create/edit form).
   * Here is handeled navigation steps between:
   *  (any segment -> formMenuSection)
   *  (any segment -> any segment)
   * Navigation steps between:
   *  (formMenuSection -> any segment)
   * is handeled by chengeStepInMenu(direction: MenuDirections)
   *
   * @param currentStep - indicates from which section navigation request is comming.
   * @param segmentsDirections - indicates to which form section to navigate.
   */
  chengeStepInSegment(currentStep: Steps, segmentsDirections?: SegmentsDirections) {

    let menuDirection: MenuDirections = 'formSectionsMenu';

    switch (currentStep) {

      // // Initial info
      // case 'initialInfoStep':
      //   break;

      // // Form sections menu
      // case 'formSectionsMenuStep':
      //   break

      // General info
      case 'generalInfoPage1Step':
        if (!this.mainForm.value.generalInfo.completed && segmentsDirections === 'forward')
          menuDirection =  'generalInfoPage2'
        break
      case 'generalInfoPage2Step':
        if (!this.mainForm.value.generalInfo.completed)
          menuDirection = (segmentsDirections === 'forward') ? 'generalInfoPage3' : 'generalInfoPage1'
        break
      case 'generalInfoPage3Step':
        if (!this.mainForm.value.generalInfo.completed)
          (segmentsDirections === 'forward') ? this.setSectionGroupCompleted('generalInfo') : 'generalInfoPage2';
        break

      // Equipment info
      case 'equipmentInfoPage1Step':
        if (!this.mainForm.value.equipmentInfo.completed && segmentsDirections === 'forward')
          menuDirection = 'equipmentInfoPage2';
        break
      case 'equipmentInfoPage2Step':
        if (!this.mainForm.value.equipmentInfo.completed)
          menuDirection = (segmentsDirections === 'forward') ? 'equipmentInfoPage3' : 'equipmentInfoPage1'
        break
      case 'equipmentInfoPage3Step':
        if (!this.mainForm.value.equipmentInfo.completed)
          menuDirection = (segmentsDirections === 'forward') ? 'equipmentInfoPage4' : 'equipmentInfoPage2'
        break
      case 'equipmentInfoPage4Step':
        if (!this.mainForm.value.equipmentInfo.completed)
          menuDirection = (segmentsDirections === 'forward') ? 'equipmentInfoPage5' : 'equipmentInfoPage3'
        break
      case 'equipmentInfoPage5Step':
        if (!this.mainForm.value.equipmentInfo.completed)
          (segmentsDirections === 'forward') ? this.setSectionGroupCompleted('equipmentInfo') : 'equipmentInfoPage4';
        break

      // Detail info
      case 'detailsInfoPage1Step':
        if (!this.mainForm.value.detailsInfo.completed && segmentsDirections === 'forward')
          menuDirection = 'detailsInfoPage2'
        break

      case 'detailsInfoPage2Step':
        if (!this.mainForm.value.detailsInfo.completed)
          (segmentsDirections === 'forward') ? this.setSectionGroupCompleted('detailsInfo') : menuDirection = 'detailsInfoPage1'
        break

      // Contact info
      case 'contactInfoPage1Step':
        if (!this.mainForm.value.contactInfo.completed && segmentsDirections === 'forward')
          menuDirection = 'contactInfoPage2'
        break

      case 'contactInfoPage2Step':
        if (!this.mainForm.value.contactInfo.completed)
          (segmentsDirections === 'forward') ? this.setSectionGroupCompleted('contactInfo') : menuDirection = 'contactInfoPage1'
        break
      default:
        menuDirection = 'formSectionsMenu';

    }

    this.currentStepBs.next(menuDirection);
  }



  initAdvertForm() {

    return this._fb.group({
      id: null,
      //userId: null,
      isPublished: null,
      createdAt: null,
      modifiedAt: null,
      publishedAt: null,

      generalInfo: this._fb.group({
        completed: false,
        general: this._fb.group({
          brand: null,
          model: null,
          produced: null,
          producedFrom: null,
          producedTill: null,


          year: [null, [Validators.required]],// [null, [Validators.required, IsNumber, MileageMinMax]],
          month: [null, [Validators.required]],
          body: [null, [Validators.required]],
          seats: null,
          doors: null,

          generation: null,
          modification: null,

          powertrainArchitecture: null, // ????????????????


        }),
        performance: this._fb.group({
          fuel: [null, [Validators.required]],
          emissionSticker: null,
          emission: null,

          consumption_urban: null,
          consumption_extra_urban: null,
          consumption_combined: null,
          co2_emissions: null,

        }),
        engine: this._fb.group({
          power: null, //[null, [Validators.required]],
          cubicCapacity: null,
        }),
        chassis: this._fb.group({
          gear: null,
          transmission: null,
          drivewheels: null,
          paddleshifter: null,
        }),
        condition: this._fb.group({
          mileage: [null, [Validators.required]],
          owners: null,
          accidentFree: null,
          roadworthy: [null, [Validators.required]],
          nonSmoking: null,
          inspectionMonthUntil: null,
          inspectionYearUntil: null,
          inspectionUntil: null,
          serviceHistory: null,
          warranty: null
        })

      }),
      equipmentInfo: this._fb.group({
        completed: false,
        interiorExterior: this._fb.group({
          exteriorColor: null,
          metalic: null,
          material: null,
          interiorColor: null,
        }),
        safety: this._fb.group({
          abs: null,
          esp: null,
          asr: null,
          hillStart: null,
          fatigueWarning: null,
          laneChange: null,
          blindSpot: null,
          dimmingMirror: null,
          nightVision: null,
          emergencyBrake: null,
          emergencyCall: null,
          trafficSignRecog: null,
          cruise: null,
          speedLimit: null,
          distanceWarning: null,
          airbags: null,
          isofixChild: null,
          isofixPassenger: null,
          headlights: null,
          headlightsWasher: null,
          alarm: null,
          immobilizer: null
        }),
        comfort: this._fb.group({
          climatisation: null,
          auxiliaryHeating: false,
          heatedWindshield: false,
          heatedSteeringWheel: false,
          selfSteering: false,
          parkingAssist: this._fb.array([]),
          camera: this._fb.array([]),
          seatsHeated: this._fb.array([]),
          seatsElectricAdjustable: this._fb.array([]),
          seatsSport: false,
          armRest: false,
          seatsMassage: false,
          seatsMemory: false,
          seatsVentilation: false,
          seatsFoldflat: false,
          electricWindow: false,
          electricMirror: false,
          electricTailgate: false,
          centralLocking: false,
          keyless: false,
          lightSensor: false,
          rainSensor: false,
          powerAssistSteering: false,
          leatherSteeringWheel: false
        }),
        infotainment: this._fb.group({
          radio: false,
          dabRadio: false,
          cdPlayer: false,
          tv: false,
          navigationSystem: false,
          soundSystem: false,
          touchScreen: false,
          voiceControl: false,
          multifunctionSteeringWheel: false,
          handsFreeKit: false,
          usbPort: false,
          bluetooth: false,
          appleCarPlay: false,
          androidAuto: false,
          wlanWifiHotspot: false,
          integratedMusicStreaming: false,
          inductionChargingForSmartphones: false,
          onboardComputer: false,
          headupDisplay: false,
          digitalCockpit: false
        }),
        extra: this._fb.group({
          alloyWheels: false,
          summerTyres: false,
          winterTyres: false,
          allSeasonTyres: false,
          breakdownKit: null,
          tyrePressureMonitoring: false,
          winterPackage: false,
          smokerPackage: false,
          sportsPackage: false,
          sportsSuspension: false,
          airSuspension: false,
          trailerCoupling: null,
          cargoBarrier: false,
          skiBag: false,
          sunroof: false,
          panoramicRoof: false,
          roofRack: false,
          disabledAccessible: false,
          taxi: false
        })
      }),
      detailsInfo: this._fb.group({
        completed: false,
        subtitle: null,
        description: null,
        price: [null, [Validators.required]],
        isNegotiable: null,
        //images: this._fb.array([]),
        images: [],

      }),
      contactInfo: this._fb.group({
        completed: false,
        contact: this._fb.group({
          title: [null, [Validators.required]],
          fisrtName: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
          lastName: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
          showName: [null, [Validators.required]],
          countryCode: ['49', [Validators.required]],
          phoneNumber: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
          accountType: null//'Private'

        }),
        address: this._fb.group({
          country: ['DE', [Validators.required]],
          route: [null, [Validators.required]],
          street_number: [null, [Validators.required]],
          locality: [null, [Validators.required]],
          postal_code: [null, [Validators.required]],
          location: this._fb.group({
            type: 'Point',
            //coordinates: this._fb.array([]),
            coordinates: null,
            x: null,
            y: null,
          })
        }),




      })

    });
  }








}






















