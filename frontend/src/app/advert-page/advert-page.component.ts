import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Checkbox } from '../enums/checkbox.enum';
import { Advert } from '../interfaces/advert';
import { CalcEnginePowerPipe } from '../pipes/calc-engine-power.pipe';
import { CommaNumberPipe } from '../pipes/comma-number.pipe';
import { AdvertService } from '../services/advert.service';
import { NavigationService } from '../services/navigation.service';
import { NotificationService } from '../services/notification.service';
import { SelectorOptionsService } from '../services/selector-options.service';

@Component({
  selector: 'app-advert-page',
  templateUrl: './advert-page.component.html',
  styleUrls: ['./advert-page.component.scss']
})
export class AdvertPageComponent implements OnInit {

  ad?: Advert
  features: string[] = []; // features (checkboxes)

  constructor(
    private route: ActivatedRoute,
    private advertService: AdvertService,
    private datePipe: DatePipe,
    private commaPipe: CommaNumberPipe,
    private hpToKw: CalcEnginePowerPipe,
    private optionsService: SelectorOptionsService,
    private notifier: NotificationService,
    private navigation: NavigationService
  ) { }


  inProgress() {
    this.notifier.onWarning('This functionality is still in progress. ')
  }

  ngOnInit(): void {


    this.checkboxNames()

    this.route.params.subscribe((params: Params) => {

      this.advertService.getById(params['id']).subscribe(advert => {
        this.ad = advert

        // features (checkboxes)
        this.gatherFeatures(this.ad);
        this.features.sort();
      })
    });

  }
  backToSearchResults() {
    if (this.ad?.id) localStorage.setItem('seenAdID', this.ad.id)
    this.navigation.backToWhereWeLeft();
  }


  // generalInfo
  get general() {
    return this.ad?.generalInfo?.general;
  }

  get performance() {
    return this.ad?.generalInfo?.performance;
  }

  get engine() {
    return this.ad?.generalInfo?.engine;
  }

  get chassis() {
    return this.ad?.generalInfo?.chassis;
  }

  get condition() {
    return this.ad?.generalInfo?.condition;
  }

  // equipmentInfo
  get interiorExterior() {
    return this.ad?.equipmentInfo?.interiorExterior;
  }


  get safety() {
    return this.ad?.equipmentInfo?.safety;
  }

  get comfort() {
    return this.ad?.equipmentInfo?.comfort;
  }

  get infotainment() {
    return this.ad?.equipmentInfo?.infotainment;
  }

  get extra() {
    return this.ad?.equipmentInfo?.extra;
  }

  // detailsInfo

  get details() {
    return this.ad?.detailsInfo;
  }


  // contactInfo

  get contact() {
    return this.ad?.contactInfo?.contact;
  }

  get address() {
    return this.ad?.contactInfo?.address;
  }



  // sidebar info
  get title() {
    return (this.general?.brand && this.general?.model) ? this.general.brand + ' ' + this.general.model : null;
  }

  get price() {
    return this.ad?.detailsInfo?.price;
  }

  get negotiable() {
    if (this.details?.isNegotiable == null || this.details.isNegotiable == undefined) return null
    return (this.ad?.detailsInfo?.isNegotiable) ? '[negotiable]' : '[fixed]';
  }

  get sellerName() {
    return (this.contact?.showName) ?
      this.contact.title + ' ' + this.contact.fisrtName + ' ' + this.contact.lastName :
      'Private Seller'
  }

  get location() {
    return this.address?.country + '-' + this.address?.postal_code + ' ' + this.address?.locality
  }

  get phone() {

    return (this.contact?.countryCode && this.contact?.phoneNumber) ?
      ' +' + this.contact.countryCode + '(0)' + this.contact.phoneNumber : null
  }


  iconLinks = {
    mileage: '../../assets/images/svg/mileage.svg',
    registration: '../../assets/images/svg/calendar.svg',
    power: '../../assets/images/svg/engine.svg',
    transmission: '../../assets/images/svg/gearshift.svg',
    owners: '../../assets/images/svg/owners.svg',
    fuel: '../../assets/images/svg/fuel.svg'
  }


  // key-features
  get keyFeatures():{name:string, value?:string, svg:string}[] {

    let features: {name:string, value?:string, svg:string}[] = []
    if (this.condition?.mileage) features.push({ name: 'Mileage', value: this.mileage, svg: '../../assets/images/svg/mileage.svg' });
    if (this.firstRegistration) features.push({ name: 'First Registration', value: this.firstRegistration, svg: '../../assets/images/svg/calendar.svg' });
    if (this.power) features.push({ name: 'Power', value: this.power, svg: '../../assets/images/svg/engine.svg' });
    if (this.chassis?.transmission) features.push({ name: 'Gearbox', value: this.capitalizeFirstLetter(this.chassis.transmission), svg: '../../assets/images/svg/gearshift.svg' });
    if (this.condition?.owners) features.push({ name: 'Previous Owners', value: this.condition?.owners?.toString(), svg: '../../assets/images/svg/owners.svg' });
    if (this.performance?.fuel) features.push({ name: 'Fuel', value: this.performance?.fuel, svg: '../../assets/images/svg/fuel.svg' });
    return features;
  }


  // tech data

  get gearboxInfo() {
    let output: string[] = []

    if (this.chassis?.transmission) output.push(this.capitalizeFirstLetter(this.chassis.transmission));

    const paddleshifterValue = this.optionsService.getCheckboxValue('paddleshifter');
    if (this.chassis?.paddleshifter && paddleshifterValue) output.push('(with ' + this.decapitalizeFirstLetter(paddleshifterValue) + ')');

    return (output.length) ? output.join(' ') : null;
  }

  get firstRegistration() {
    return (this.ad?.generalInfo.general.produced) ?
      this.datePipe.transform(this.ad.generalInfo.general.produced, 'MM/yyyy') :
      null;

  }

  get hu() {
    let year = this.condition?.inspectionYearUntil;
    if (year == null || year == undefined) return null;

    let month = this.condition?.inspectionMonthUntil;
    if (month == null || month == undefined) return null;

    return this.datePipe.transform(new Date(month + ' ' + year), 'MM/yyyy')
  }

  get controls() {
    let output: string[] = []
    if (this.safety?.cruise) output.push(this.safety.cruise);

    const speedLimitValue = this.optionsService.getCheckboxValue('speedLimit');
    if (this.safety?.speedLimit && speedLimitValue) output.push(speedLimitValue);

    const distanceWarningValue = this.optionsService.getCheckboxValue('distanceWarning');
    if (this.safety?.distanceWarning && distanceWarningValue) output.push(distanceWarningValue);
    return output;
  }

  get parkingSensonrs() {
    let output: string[] = []

    if (this.comfort?.parkingAssist && this.comfort.parkingAssist.length) output = output.concat(this.comfort.parkingAssist);
    if (this.comfort?.selfSteering) output.push('Self-steering systems');
    if (this.comfort?.camera && this.comfort.camera.length) output = output.concat(this.comfort.camera);

    return (output.length) ? output.join(', ') : null;
  }

  get heatedSeats() {
    return (this.comfort?.seatsHeated && this.comfort.seatsHeated.length) ? this.comfort.seatsHeated.join(' and ') : null;
  }

  get elSeats() {
    return (this.comfort?.seatsElectricAdjustable && this.comfort.seatsElectricAdjustable.length) ? this.comfort.seatsElectricAdjustable.join(' and ') : null;
  }

  get exteriorColor() {
    let output: string[] = [];
    if (this.interiorExterior?.exteriorColor) output.push(this.interiorExterior.exteriorColor);
    if (this.interiorExterior?.metalic) output.push('Metalic');
    return (output.length) ? output.join(' ') : null;
  }

  get interiorDesign() {
    let output: string[] = [];
    if (this.interiorExterior?.material) output.push(this.interiorExterior.material);
    if (this.interiorExterior?.interiorColor) output.push(this.interiorExterior.interiorColor);

    return (output.length) ? output.join(' ') : null;
  }

  get vehicleCondition() {
    let outputStr: string[] = [];

    if (this.condition?.roadworthy != null || this.condition?.roadworthy != undefined)
      (this.condition?.roadworthy) ? outputStr.push('Road Worthy') : outputStr.push('Damaged');


    if (this.condition?.accidentFree != null || this.condition?.accidentFree != undefined)
      (this.condition?.accidentFree) ? outputStr.push('Accident-free') : outputStr.push('Had-been-In-Accident');

    return (outputStr) ? outputStr.join(', ') : null;
  }


  get mileage() {
    return (this.ad?.generalInfo?.condition?.mileage) ? this.commaPipe.transform(this.ad.generalInfo.condition.mileage) + ' km' : undefined;
  }

  get cubicCapacity() {
    return (this.ad?.generalInfo?.engine?.cubicCapacity) ? this.commaPipe.transform(this.ad.generalInfo.engine.cubicCapacity) + ' cm³' : null;
  }

  get power() {
    return (this.engine?.power) ? `${this.hpToKw.transform(this.engine.power, 'kw')} kW (${this.engine.power} Hp)` : null;
  }

  get consumptions() {

    let consumptionOutputs: string[] = [];
    if (this.performance?.consumption_combined) consumptionOutputs.push(this.performance.consumption_combined + ' l/100 km (combined)*')
    if (this.performance?.consumption_urban) consumptionOutputs.push(this.performance.consumption_urban + ' l/100 km (urban)*')
    if (this.performance?.consumption_extra_urban) consumptionOutputs.push(this.performance.consumption_extra_urban + ' l/100 km (extra urban)*')

    return consumptionOutputs
  }




  // features (checkboxes)

  private gatherFeatures(advert: Advert) {

    Object.entries(advert).map(([k,v])=>{

      if (v == null || v == undefined) return

      if (typeof v === 'object' && !Array.isArray(v)) {
        this.gatherFeatures(v);
      } else {
        let feature = this.displayCheckBoxes.get(k);
        if (feature && v) this.features.push(feature);
      }


    })
  };




  // other
  capitalizeFirstLetter(str: string) {
    return (str) ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }

  decapitalizeFirstLetter(str: string) {
    return (str) ? str.charAt(0).toLocaleLowerCase() + str.slice(1) : str;
  }




  checkboxNames() {

    let keys = ['paddleshifter','nonSmoking','serviceHistory','warranty','abs','esp','asr','hillStart',
      'fatigueWarning','laneChange','blindSpot','dimmingMirror','nightVision','emergencyBrake','emergencyCall',
      'trafficSignRecog','speedLimit','distanceWarning','isofixChild','isofixPassenger','headlightsWasher','alarm',
      'immobilizer','auxiliaryHeating','heatedWindshield','heatedSteeringWheel','seatsSport','armRest','seatsMassage',
      'seatsMemory','seatsVentilation','seatsFoldflat','electricWindow','electricMirror','electricTailgate','centralLocking',
      'keyless','lightSensor','rainSensor','powerAssistSteering','leatherSteeringWheel','radio','dabRadio','cdPlayer',
      'tv','navigationSystem','soundSystem','touchScreen','voiceControl','multifunctionSteeringWheel','handsFreeKit',
      'usbPort','bluetooth','appleCarPlay','androidAuto','wlanWifiHotspot','integratedMusicStreaming','inductionChargingForSmartphones',
      'onboardComputer','headupDisplay','digitalCockpit','alloyWheels','summerTyres','winterTyres','allSeasonTyres',
      'tyrePressureMonitoring','winterPackage','smokerPackage','sportsPackage','sportsSuspension','airSuspension',
      'cargoBarrier','skiBag','sunroof','panoramicRoof','roofRack','disabledAccessible','taxi',
    ];
    keys.map(name => this.displayCheckBoxes.set(name, Checkbox[name as keyof {}]));
  }

  displayCheckBoxes: Map<string, string> = new Map();

}

