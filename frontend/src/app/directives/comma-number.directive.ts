import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[commaNumberDirective]'
})
export class CommaNumberDirective implements OnInit {

  @Input() powerTypeInDirective: any;

  private eventOptions = {
    onlySelf: true,
    emitEvent: false,
    emitViewToModelChange: false,

  };

  constructor(private ngControl: NgControl) { }






   ngOnInit(): void {

    // https://stackoverflow.com/questions/49522542/how-to-use-pipes-in-angular-5-reactive-form-input

    this.ngControl.valueChanges?.subscribe(changes => {


      if  (!changes) changes = null;

      if(changes){

        changes = changes.toString();
        const leave = ['0','1','2','3','4','5','6','7','8','9'];
        changes = [...changes].filter((char:string) => leave.includes(char)).join('');

      }



      if (changes) {
        changes = changes.toString().replaceAll(',','')
        changes = isNaN(changes) ? changes : parseInt(changes);
      }

      this.ngControl.control?.setValue(changes , this.eventOptions);


    });
  }


}
