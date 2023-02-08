import { AccountType } from "../enums/user-account-types"

export interface Advert {
  "id": string|null,
  //"userId": string|null,
  "isPublished": boolean|null,
  "createdAt": string|null,
  "modifiedAt": string|null,
  "publishedAt": string|null,

  "generalInfo": {
    "completed": boolean|null,
    "general": {
      "brand": string|null,
      "model": string|null,
      "produced": number|null,
      "producedFrom": number|null,
      "producedTill": number|null,
      "year": string|null,
      "month": number|null,
      "body": string|null,
      "seats": string|null,
      "doors": string|null,

      "generation": string|null,
      "modification": string|null,
      "powertrainArchitecture": string|null,
    },
    "performance": {
      "fuel": string|null,
      "emissionSticker": string|null,
      "emission": string|null,

      "consumption_urban": string|null,
      "consumption_extra_urban": string|null,
      "consumption_combined": string|null,
      "co2_emissions": string|null,

    },
    "engine": {
      "power": number|null,
      "cubicCapacity": number|null,
    },
    "chassis": {
      "gear": string|null,
      "transmission": string|null,
      "drivewheels": string|null,
      "paddleshifter": boolean|null,
    },
    "condition": {
      "mileage": number|null,
      "owners": number|null,
      "accidentFree": boolean|null,
      "roadworthy": boolean|null,
      "nonSmoking": boolean|null,
      "inspectionMonthUntil": number|null,
      "inspectionYearUntil": string|null,
      "inspectionUntil": number|null, // check this is not saved to db
      "serviceHistory": string|null,
      "warranty": string|null
    }

  },
  "equipmentInfo": {
    "completed": boolean|null,
    "interiorExterior": {
      "exteriorColor": string|null,
      "metalic": boolean|null,
      "material": string|null,
      "interiorColor": string|null,
    },
    "safety": {
      "abs": boolean|null,
      "esp": boolean|null,
      "asr": boolean|null,
      "hillStart": boolean|null,
      "fatigueWarning": boolean|null,
      "laneChange": boolean|null,
      "blindSpot": boolean|null,
      "dimmingMirror": boolean|null,
      "nightVision": boolean|null,
      "emergencyBrake": boolean|null,
      "emergencyCall": boolean|null,
      "trafficSignRecog": boolean|null,
      "cruise": string|null,
      "speedLimit": boolean|null,
      "distanceWarning": boolean|null,
      "airbags": string|null,
      "isofixChild": boolean|null,
      "isofixPassenger": boolean|null,
      "headlights": string|null,
      "headlightsWasher": boolean|null,
      "alarm": boolean|null,
      "immobilizer": boolean|null,
    },
    "comfort": {
      "climatisation": string|null,
      "auxiliaryHeating": boolean|null,
      "heatedWindshield": boolean|null,
      "heatedSteeringWheel": boolean|null,
      "selfSteering": boolean|null,
      "parkingAssist": string[]|null,
      "camera": string[]|null,
      "seatsHeated": string[]|null,
      "seatsElectricAdjustable": string[]|null,
      "seatsSport": boolean|null,
      "armRest": boolean|null,
      "seatsMassage": boolean|null,
      "seatsMemory": boolean|null,
      "seatsVentilation": boolean|null,
      "seatsFoldflat": boolean|null,
      "electricWindow": boolean|null,
      "electricMirror": boolean|null,
      "electricTailgate": boolean|null,
      "centralLocking": boolean|null,
      "keyless": boolean|null,
      "lightSensor": boolean|null,
      "rainSensor": boolean|null,
      "powerAssistSteering": boolean|null,
      "leatherSteeringWheel": boolean|null,
    },
    "infotainment": {
      "radio": boolean|null,
      "dabRadio": boolean|null,
      "cdPlayer": boolean|null,
      "tv": boolean|null,
      "navigationSystem": boolean|null,
      "soundSystem": boolean|null,
      "touchScreen": boolean|null,
      "voiceControl": boolean|null,
      "multifunctionSteeringWheel": boolean|null,
      "handsFreeKit": boolean|null,
      "usbPort": boolean|null,
      "bluetooth": boolean|null,
      "appleCarPlay": boolean|null,
      "androidAuto": boolean|null,
      "wlanWifiHotspot": boolean|null,
      "integratedMusicStreaming": boolean|null,
      "inductionChargingForSmartphones": boolean|null,
      "onboardComputer": boolean|null,
      "headupDisplay": boolean|null,
      "digitalCockpit": boolean|null,
    },
    "extra": {
      "alloyWheels": boolean|null,
      "summerTyres": boolean|null,
      "winterTyres": boolean|null,
      "allSeasonTyres": boolean|null,
      "breakdownKit": string|null,
      "tyrePressureMonitoring": boolean|null,
      "winterPackage": boolean|null,
      "smokerPackage": boolean|null,
      "sportsPackage": boolean|null,
      "sportsSuspension": boolean|null,
      "airSuspension": boolean|null,
      "trailerCoupling": string|null,
      "cargoBarrier": boolean|null,
      "skiBag": boolean|null,
      "sunroof": boolean|null,
      "panoramicRoof": boolean|null,
      "roofRack": boolean|null,
      "disabledAccessible": boolean|null,
      "taxi": boolean|null,
    }
  },
  "detailsInfo": {
    "completed": boolean|null,
    "subtitle": string|null,
    "description": string|null,
    "price": number|null,
    "isNegotiable": boolean|null,
    "images": Image[],
  },
  "contactInfo": {
    "completed": boolean|null,
    "contact": {
      "title": string|null,
      "fisrtName": string|null,
      "lastName": string|null,
      "showName": boolean|null,
      "countryCode": string|null,
      "phoneNumber": string|null,
      "accountType": AccountType
    },
    "address": {
      "country": string|null,
      "route": string|null,
      "street_number": string|null,
      "locality": string|null,
      "postal_code": string|null,
      "location": {
        "type?": string|null,
        "coordinates?": number[],
        "x"?: number|null,
        "y"?: number|null,
      }|null
    }
  }



}

export interface Image {
  "name": string|null,
  "url": string|null
}
