import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enginePower'
})
export class EnginePowerPipe implements PipeTransform {

  transform(hp: number): any {



    console.log(hp);

    const kw = Math.round(hp*0.745699872);
    // return `${kw} kW (${hp} Hp)`;
    return kw;
  }

}
