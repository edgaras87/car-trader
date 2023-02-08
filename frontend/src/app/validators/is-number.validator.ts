import { AbstractControl } from '@angular/forms';

export function IsNumber(control: AbstractControl) : { [key: string]:any } | null {


    return (control.value != null && control.value != undefined && isNaN(control.value))  ? { notNumber: true }  : null;
}
