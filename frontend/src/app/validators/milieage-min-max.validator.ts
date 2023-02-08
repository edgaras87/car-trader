import { AbstractControl } from "@angular/forms";

export function MileageMinMax(control: AbstractControl) : { [key: string]:any } | null {

  if (!control.value) return { wrongMileage: true }
  return (0 < control.value &&  control.value < 9999999) ? null : { wrongMileage: true };
}
