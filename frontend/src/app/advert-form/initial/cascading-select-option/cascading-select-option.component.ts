import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-cascading-select-option',
  templateUrl: './cascading-select-option.component.html',
  styleUrls: ['./cascading-select-option.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class CascadingSelectOptionComponent  {

  private _isDisabled!:any
  @Input()
  set isDisabled(values: any) {
    this._isDisabled = values;
  }
  get isDisabled() {
    return this._isDisabled;
  }


  @Input() controlName!: string;
  private _options!:any[];
  @Input()
  set options(values: any[]) {
    this._options = values;
  }
  get options() {
    return this._options;
  }


  @Output() optionSelected = new EventEmitter<any>();
  @Input() size:number = 4;

  constructor() { }

  onSelect() {
    this.optionSelected.emit(this.controlName);
  }


}

