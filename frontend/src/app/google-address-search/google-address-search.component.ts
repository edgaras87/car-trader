import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';


export interface FoundLocation {
  postal_code: string|null,
  locality: string|null,
  latitude: string|null,
  longitude: string|null,
}

// interface FilteredProperties {
//   postal_code: string,
//   sublocality: string,
//   sublocality_level_1: string,
//   locality: string
// }

@Component({
  selector: 'app-google-address-search',
  templateUrl: './google-address-search.component.html',
  styleUrls: ['./google-address-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
//export class GoogleAddressSearchComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit  {
  export class GoogleAddressSearchComponent implements OnInit, OnDestroy  {


  private firstInit:boolean = true

  ngOnDestroy(): void {
    this.removeAutocompleteListner();
  }

  @Input() styles:any;

  //@Input() selectedCountry:any = 'DE';

  private _selectedCountry: string|null = 'DE';

  @Input()
  set selectedCountry(value: string|null) {
    this._selectedCountry = value;
    if (this.firstInit) {
      this.firstInit = false;
    } else {
      this.isBlank('')
      this.removeAutocompleteListner();

      if (this._selectedCountry) {
        this.initialize();
      }
    }
  }

  get selectedCountry(): string|null {
      return this._selectedCountry;
  }





  //@Input() searchType: 'locality' | 'postal_code' | 'all' = 'locality';
  @Input() searchType: '(regions)' | 'postal_code' = '(regions)';


  @Input() latitude:string|null = null;
  @Input() longitude:string|null = null;
  @Input() locality:string|null = null;
  @Input() postal_code:string|null = null;


  @Output() foundLocationOutput: EventEmitter<FoundLocation> = new EventEmitter<FoundLocation>()
  currentInput:string|null = '';
  lastInput:string|null = '';



  input?: any
  autocomplete?: google.maps.places.Autocomplete
  mapsEventListener?: google.maps.MapsEventListener;



  // how precise address output, e.g. city + county + manicipal ....
  addressLength = (this.searchType == 'postal_code') ? 1 : 2;
  placeholder = (this.searchType == 'postal_code') ? 'Enter postal code' : 'Any';

  foundLocation:FoundLocation ={
    latitude : null,
    longitude : null,
    locality : null,
    postal_code : null
  };


  // current input display value
  setCurrentInput() {

    // postcode + city
    /*
    let locationBucket:string[] = [];
    if (this.postal_code) locationBucket.push(this.postal_code)
    if (this.locality) locationBucket.push(this.locality)
    this.currentInput = locationBucket.join(', ')
    */

    // postcode or city
    this.currentInput = (this.searchType === 'postal_code') ? this.postal_code : this.locality;


    this.lastInput = this.currentInput;
  }

  ngOnInit(): void {
    this.setCurrentInput();

  }

  // resets values if input value becomes empty (string='' or null or undefined)
  isBlank(val:string) {
    if (!val) {
      this.latitude = null;
      this.longitude = null;
      this.postal_code = null;
      this.locality = null;
      this.lastInput = this.currentInput = '';

      this.foundLocationOutput.emit(
        {
          latitude:this.latitude,
          longitude: this.longitude,
          postal_code:this.postal_code,
          locality:this.locality
        }
      );
    }







  }





  initialize() {
    this.input = document.getElementById('searchTextField');




    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: this.selectedCountry },
      types: [this.searchType],
      fields: ["geometry", "address_components"] // demands results only with fields
    }

    if (this.input){
      this.autocomplete = new google.maps.places.Autocomplete(this.input, options);
    }

    if (this.autocomplete){


      this.mapsEventListener = google.maps.event.addListener(this.autocomplete, 'place_changed', () => {

        let place: google.maps.places.PlaceResult | undefined = this.autocomplete?.getPlace();
        let address_components = place?.address_components;

        let addressBucket = [];
        if (address_components) {
          for (var i = 0; i < address_components.length; i++) {
            for (var j = 0; j < address_components[i].types.length; j++) {
              if (address_components[i].types[j] == "postal_code") {
                this.postal_code = address_components[i].long_name
              }
              if (address_components[i].types[j] == "locality") {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_1" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_2" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_3" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_4" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_5" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_6" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
              if (address_components[i].types[j] == "administrative_area_level_7" && addressBucket.length > this.addressLength) {
                addressBucket.push(address_components[i].long_name)
              }
            }
          }
        }




        this.latitude = (place?.geometry?.location?.lat()) ? place?.geometry?.location?.lat().toString() : null;
        this.longitude = (place?.geometry?.location?.lng()) ? place?.geometry?.location?.lng().toString() : null;
        this.locality = addressBucket.join(', ')

        this.setCurrentInput()


        this.foundLocationOutput.emit(
          {
            latitude:this.latitude,
            longitude: this.longitude,
            postal_code:this.postal_code,
            locality:this.locality
          }
        );

      });

    }


  }

  removeAutocompleteListner(){
    if (this.input) google.maps.event.clearInstanceListeners(this.input);
    if (this.autocomplete){
        google.maps.event.clearListeners(this.autocomplete,'place_changed');
        this.autocomplete.unbindAll()
      }
    if (this.mapsEventListener) google.maps.event.removeListener(this.mapsEventListener);

  }

  onFocus() {
    if (!this.autocomplete) this.initialize()

  }


  onBlur() {
    this.currentInput = this.lastInput;
  }



}

