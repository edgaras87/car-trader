import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showEnginePower'
})
export class ShowEnginePowerPipe implements PipeTransform {

  transform(hp: any): any {
    const kw = Math.round(hp*0.73549875);
    return `${kw} kW (${hp} Hp)`;
  }

}
