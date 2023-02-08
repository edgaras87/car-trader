import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneCountryCodes } from 'src/app/enums/phone-country-codes.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';


@Component({
  selector: 'app-contact-info-form-page-i',
  templateUrl: './contact-info-form-page-i.component.html',
  styleUrls: ['./contact-info-form-page-i.component.scss']
})
export class ContactInfoFormPageIComponent implements OnInit {

  @Input() form?: FormGroup
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }


  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }

  get countryPhoneCodes():string[] {
    return Object.keys(PhoneCountryCodes);
  }


  countryPhoneCodesKey(enumKey:string):string {
    return PhoneCountryCodes[enumKey as keyof typeof PhoneCountryCodes]
  }





  goBack() {
    this.form?.patchValue(this.previousFormCotrolValues);
    this.changeStep.emit('back');
  }




  goForward() {

    if (this.form?.valid) {
      this.changeStep.emit('forward');
    } else {
      if (this.form){
        this.form?.markAllAsTouched();
        this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
      }
    }
  }


}
