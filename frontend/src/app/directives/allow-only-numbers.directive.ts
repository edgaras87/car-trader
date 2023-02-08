import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[allowOnlyNumbers]'
})
export class AllowOnlyNumbersDirective {

  @Input() isFloat: boolean = false;



  private eventOptions = {
    onlySelf: true,
    emitEvent: false,
    emitViewToModelChange: false,

  };

  constructor(private ngControl: NgControl) { }

  ngOnInit(): void {

    this.ngControl.valueChanges?.subscribe(changes => {

      if  (changes) {
        changes = changes.toString();
        const leave = (this.isFloat) ? ['0','1','2','3','4','5','6','7','8','9','.'] : ['0','1','2','3','4','5','6','7','8','9'];
        changes = [...changes].filter((char:string) => leave.includes(char)).join('');
      } else {
        changes = null;
      }

      this.ngControl.control?.setValue(changes , this.eventOptions);

    });
  }

}
