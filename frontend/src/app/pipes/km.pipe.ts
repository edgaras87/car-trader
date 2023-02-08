import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma-number'
})
export class CommaNumberPipe extends DecimalPipe implements PipeTransform {

  override transform(value: any): any {
    value = value.replaceAll(',','');
    return super.transform(value, '1.0');;
  }

}
