import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[enginePowerDirective]'
})
export class EnginePowerDirective implements OnInit {

  @Input() powerTypeInDirective: any;

  private eventOptions = {
    onlySelf: true,
    emitEvent: false,
    emitViewToModelChange: false,

  };

  constructor(private ngControl: NgControl) { }

  ngOnInit(): void {

    this.ngControl.valueChanges?.subscribe(changes => {



      if  (!changes) changes = null;

      if(changes){

        changes = changes.toString();
        const leave = ['0','1','2','3','4','5','6','7','8','9'];
        changes = [...changes].filter((char:string) => leave.includes(char)).join('');

      }

      if (changes && !isNaN(changes)) {

        changes = parseInt(changes);
        if (this.powerTypeInDirective === "kw")
          changes = Math.round(changes * 1.359621617303904)
      }

      // if (changes){
      //   changes = (this.powerTypeInDirective === "kw") ? Math.round(changes * 1.359621617303904) : changes;
      // }

      this.ngControl.control?.setValue(changes , this.eventOptions);


    });
  }



}
