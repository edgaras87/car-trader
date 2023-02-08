import {  Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Countries } from 'src/app/enums/countries.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { FoundLocation } from 'src/app/google-address-search/google-address-search.component';
import { ScrollService } from 'src/app/services/scroll.service';




@Component({
  selector: 'app-contact-info-form-page-ii',
  templateUrl: './contact-info-form-page-ii.component.html',
  styleUrls: ['./contact-info-form-page-ii.component.scss']
})
export class ContactInfoFormPageIiComponent implements OnInit {


  @Input() form?: FormGroup
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }





  setLocation(foundLocation:FoundLocation) {

    this.form?.get('locality')?.setValue(foundLocation.locality);
    this.form?.get('postal_code')?.setValue(foundLocation.postal_code);
    this.form?.get('location')?.get('coordinates')?.setValue([foundLocation.longitude, foundLocation.latitude]);
    this.form?.get('location')?.get('x')?.setValue([foundLocation.longitude]);
    this.form?.get('location')?.get('y')?.setValue([foundLocation.latitude]);

  }


  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ) { }

  resetAddressFields() {
    this.form?.get('locality')?.setValue(null);
    this.form?.get('postal_code')?.setValue(null);
    this.form?.get('location')?.get('coordinates')?.setValue(null);
    this.form?.get('location')?.get('x')?.setValue(null);
    this.form?.get('location')?.get('y')?.setValue(null);
    this.form?.get('route')?.setValue(null);
    this.form?.get('street_number')?.setValue(null);
  }




  get countryKeys() {
    return Object.keys(Countries);
  }

  countryValue(enumKey:string) {
    return Countries[enumKey as keyof typeof Countries]
  }


  goBack() {

    this.form?.patchValue(this.previousFormCotrolValues);

    this.changeStep.emit('back');
  }

  goForward() {

    if (this.form?.valid) {
      this.changeStep.emit('forward');
    } else {
      this.form?.markAllAsTouched();
      this.scrollService.scrollToHTMLElement(this.el.nativeElement.querySelector("form .ng-invalid"));
    }
  }







}
