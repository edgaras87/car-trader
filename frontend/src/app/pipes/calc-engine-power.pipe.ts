import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcEnginePower'
})
export class CalcEnginePowerPipe implements PipeTransform {



  transform(power: any, arg1:any): any {

    if (!power) return null;

    power = power.toString();
    const leave = ['0','1','2','3','4','5','6','7','8','9'];
    power = [...power].filter((char:string) => leave.includes(char)).join('');




    if (power && !isNaN(power)) {
      power = parseInt(power);
      if (arg1 === "kw")
        power = Math.round(power * 0.73549875);
    }

    return power;

  }

}
