import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Checkbox } from 'src/app/enums/checkbox.enum';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-equipment-info-form-page-i',
  templateUrl: './equipment-info-form-page-i.component.html',
  styleUrls: ['./equipment-info-form-page-i.component.scss']
})
export class EquipmentInfoFormPageIComponent implements OnInit {


  @Input() form?: FormGroup;
  previousFormCotrolValues?: any;

  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>()


  constructor(
    private scrollService: ScrollService,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.previousFormCotrolValues = this.form?.value;
  }


  get info() {
    return this.form?.value
  }

  get exteriorColors() {
    return [
      'Beige',
      'Black',
      'Blue',
      'Brown',
      'Gold',
      'Green',
      'Grey',
      'Orange',
      'Purple',
      'Red',
      'Silver',
      'White',
      'Yellow'
    ]
  }



  get materials() {
    return [
      'Alcantara',
      'Cloth',
      'Full leather',
      'Part leather',
      'Velour',
      'Other'
    ]
  }

  get interiorColors() {
    return [
      'Black',
      'Brown',
      'Grey',
      'White',
      'Other'
    ]
  }





  colorOfCheck(colorName:string) {
    let darkColors = ['Black', 'Blue', 'Brown', 'Purple', 'Green', 'Grey'];
    return darkColors.includes(colorName) ? 'White'  : 'Black'

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


  checkboxText(checkboxName:any) {
    return  Checkbox[checkboxName as keyof typeof Checkbox];
  }


}
