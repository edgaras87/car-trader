export interface SpecificationModels {
  brand:string;
  model:string[];
}

export interface SpecificationRequest {
  brand: string;
  model: string;
  year: number;
  month: number;
}

export interface Specification {
  id: string;
  general: {
    brand: string;
    model: string;
    generation: string;
    powertrainArchitecture: string;
    seats: string;
    doors: string;
    body: string;
    modification: string;
    producedFrom: number;
    producedTill: number;
  };
  performance: {
    fuel: string;
    consumption_urban: string;
    consumption_extra_urban: string;
    consumption_combined: string;
    co2_emissions: string;
    emission: string;
    emissionSticker: string;
  };
  engine: {
    power: number;
    cubicCapacity: number;
  };
  chassis: {
    gear: string;
    transmission: string;
    drivewheels: string;
  }

}
