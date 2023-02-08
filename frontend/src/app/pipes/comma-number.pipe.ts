import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaNumber'
})
export class CommaNumberPipe extends DecimalPipe implements PipeTransform {

  override transform(value: any): any {
    return (!isNaN(value)) ? super.transform(value, '1.0') : value;
  }

}
