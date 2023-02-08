import { Injectable } from '@angular/core';
import { SortDirection, SortField } from '../enums/sort.enum';
import { SpecificationService } from './specification.service';



@Injectable({
  providedIn: 'root'
})
export class SelectorOptionsService  {



  constructor(private specifications: SpecificationService) {
    this.setSpecificationModels()
  }




  yearCount:number = 50

  private _brandOptions: string[] = [];
  private _modelOptions: Map<string, string[]> = new Map<string, string[]>()

  private _yearOptions: string[] = this.generateYearOptions(new Date().getFullYear(), this.yearCount);
  private _monthOptions: string[] = this.generateMonthOptions();
  private _priceOptions: string[] = this.generatePriceOptions();
  private _inspectionYearOptions: string[] = this.generateYearOptions(new Date().getFullYear()+5, 7);

  private _sortOptions: {[key:string] : {direction: SortDirection, field:SortField}} = this.generateSortOptions();



  get brandOptions():string[] {
    return this._brandOptions
  }

  modelOptions(brand:string|null):string[] {
    if (!brand) return [];
    const models = this._modelOptions.get(brand);
    return (models) ? models : []
  }

  get yearOptions():string[] {
    return this._yearOptions
  }

  get monthOptions():string[] {
    return this._monthOptions
  }

  get priceOptions():string[] {
    return this._priceOptions
  }

  get sortOptions(): {[key:string] : {direction: SortDirection, field:SortField}} {
    return this._sortOptions;
  }



  getCheckboxValue(checkName: string) {
    return this.checkboxValues.get(checkName);
  }


  private checkboxValues: Map<string, string> = new Map([
    // chassis
    ['paddleshifter','Paddle shifters'],
    // condition
    ['nonSmoking','Non-smoking vechicle'],
    ['serviceHistory','Full Service History'],
    ['warranty','Warranty/Factory Warranty'],
    // safety
    ['isofixChild','Isofix Child'],
    ['isofixPassenger','Isofix Passenger'],

    // condition
    ['speedLimit','Speed limit control system'],
    ['distanceWarning','Distance warning system'],

  ])



  checkboxNames = {

    //*equipmentInfo
    // chassis
    paddleshifter:'Paddle shifters',
    // condition
    nonSmoking: 'Non-smoking vechicle',
    serviceHistory: 'Full Service History',
    warranty:'Warranty/Factory Warranty',

    //*equipmentInfo

    //interiorExterior

    //safety
    abs: 'Antilocking system (ABS)',
    esp: 'Electronic stability program (ESP)',
    asr: 'Traction control (ASR)',
    hillStart: 'Hill-start assist',
    fatigueWarning: 'Fatigue warning system',
    laneChange: 'Lane change assist',
    blindSpot: 'Blind spot assist',
    dimmingMirror: 'Auto-dimming interior mirror',
    nightVision: 'Night vision assist',
    emergencyBrake: 'Emergency brake assist',
    emergencyCall: 'Emergency call system',
    trafficSignRecog: 'Traffic sign recognition',
    //cruise: '',
    speedLimit: 'Speed limit control system',
    distanceWarning: 'Distance warning system',
    //airbags: '',
    isofixChild: 'Isofix (child seat anchor points)',
    isofixPassenger: 'Passenger seat Isofix point',
    //headlights: '',
    headlightsWasher: 'Headlight washer system',
    alarm: 'Alarm system',
    immobilizer: 'Engine immobilizer',

    //comfort:
    //climatisation: '',
    auxiliaryHeating: 'Auxiliary heating',
    heatedWindshield: 'Heated windshield',
    heatedSteeringWheel: 'Heated steering wheel',
    //selfSteering: '',
    //parkingAssist: '',
    //camera: '',
    //seatsHeated: '',
    //seatsElectricAdjustable: '',
    seatsSport: 'Sport seats',
    armRest: 'Arm rest',
    seatsMassage: 'Massage seats',
    seatsMemory: 'Seat memory',
    seatsVentilation: 'Seat ventilation',
    seatsFoldflat: 'Fold flat passenger seat',
    electricWindow: 'Electric windows',
    electricMirror: 'Electric side mirror',
    electricTailgate: 'Electric tailgate',
    centralLocking: 'Central locking',
    keyless: 'Keyless system',
    lightSensor: 'Light sensor',
    rainSensor: 'Rain sensor',
    powerAssistSteering: 'Power Assisted Steering',
    leatherSteeringWheel: 'Leather steering wheel',

    //infotainment
    radio: 'Tuner/radio',
    dabRadio: 'DAB radio',
    cdPlayer: 'CD player',
    tv: 'TV',
    navigationSystem: 'Navigation system',
    soundSystem: 'Sound system',
    touchScreen: 'Touchscreen',
    voiceControl: 'Voice control',
    multifunctionSteeringWheel: 'Multifunction steering wheel',
    handsFreeKit: 'Hands-free kit',
    usbPort: 'USB port',
    bluetooth: 'Bluetooth',
    appleCarPlay: 'Apple CarPlay',
    androidAuto: 'Android Auto',
    wlanWifiHotspot: 'WLAN / WiFi hotspot',
    integratedMusicStreaming: 'Integrated music streaming',
    inductionChargingForSmartphones: 'Induction charging for smartphones',
    onboardComputer: 'On-board computer',
    headupDisplay: 'Head-up display',
    digitalCockpit: 'Digital cockpit',

    //extra
    alloyWheels: 'Alloy wheels',
    summerTyres: 'Summer tyres',
    winterTyres: 'Winter tyres',
    allSeasonTyres: 'All season tyres',
    //breakdownKit:'',
    tyrePressureMonitoring: 'Tyre pressure monitoring',
    winterPackage: 'Winter package',
    smokerPackage: "Smoker's package",
    sportsPackage: 'Sports package',
    sportsSuspension: 'Sports suspension',
    airSuspension: 'Air suspension',
    //trailerCoupling:'',
    cargoBarrier: 'Cargo barrier',
    skiBag: 'Ski bag',
    sunroof: 'Sunroof',
    panoramicRoof: 'Panoramic roof',
    roofRack: 'Roof rack',
    disabledAccessible: 'Disabled accessible',
    taxi: 'Taxi',

  }


  get fuelOptions():string[] {
    return ['Diesel', 'Diesel / Electric', 'Petrol', 'Petrol / Electric', 'Electric', 'Hydrogen', 'Hydrogen / Electric'];

  }


  get mileageOptions():string[] {
    return [
      '5000',
      '10000',
      '20000',
      '30000',
      '40000',
      '50000',
      '60000',
      '70000',
      '80000',
      '90000',
      '100000',
      '125000',
      '150000',
      '175000',
      '200000',
      '225000',
      '250000',
      '275000',
      '300000'
    ];
  }












  get doorOptions():string[] {
    return ['2/3', '4/5', '6/7']
  }

  get bodyOptions():string[] {
    return [

      'Sedan',
      'Estate',
      'Hatchbacks',
      'Cabriolet / Roadster',
      'Coupe / Sports Car',
      'SUV / Off-road Vehicle / Pick-up Truck',
      'Van / Minibus',
      'Other'
    ]

  }



  // condision

  get inspectionYearOptions():string[] {
    return this._inspectionYearOptions
  }


  get distanceOptions():string[] {
    return [
      '10',
      '20',
      '30',
      '50',
      '70',
      '100',
      '150',
      '200',
      '300',
      '500',
      '750',
      '1000',
    ]
  }






  private setSpecificationModels():void {

    this.specifications.specificationModels().subscribe(specificationModels => {
      specificationModels.map(specificationModel => {
        this._brandOptions.push(specificationModel.brand);
        this._modelOptions.set(specificationModel.brand,specificationModel.model.sort());
      });
    });
  }


  private generateYearOptions(currentYear:number, yearCount:number):string[] {

    var yearRange: string[] = []
    for (let i = 0; i < yearCount; i++)
      yearRange.push((currentYear - i).toString())
    return yearRange;
    // return yearRange.map(num => num.toString())
  }


  generateMonthOptions():string[] {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }





  private generatePriceOptions():string[] {

    let startPrice:number
    let increment: number
    var price: number[] = []

    startPrice = 0
    increment = 500
    for (let i = 0; i < 19; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 1000
    for (let i = 1; i < 12; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 2500
    for (let i = 1; i < 9; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 5000
    for (let i = 1; i < 13; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 10000
    for (let i = 1; i < 11; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 25000
    for (let i = 1; i < 13; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 100000
    for (let i = 1; i < 6; i++)
      price.push(startPrice + increment * i)

    startPrice = price[price.length - 1]
    increment = 200000
    for (let i = 1; i < 6; i++)
      price.push(startPrice + increment * i)

    return price.map(number=>number.toString());
  }




  generateSortOptions():{[key:string] : {direction: SortDirection, field:SortField}} {
    return {
      'price ascendind' : {direction: SortDirection.ascending, field:SortField.price },
      'price descending': {direction: SortDirection.descending, field:SortField.price },
      'upload ascendind': {direction: SortDirection.ascending, field:SortField.upload },
      'upload descending': {direction: SortDirection.descending, field:SortField.upload },
      'year ascendind' : {direction: SortDirection.ascending, field:SortField.year },
      'year descending': {direction: SortDirection.descending, field:SortField.year },
      'mileage ascendind': {direction: SortDirection.ascending, field:SortField.mileage },
      'mileage descending': {direction: SortDirection.descending, field:SortField.mileage },
    }
  }


}




















