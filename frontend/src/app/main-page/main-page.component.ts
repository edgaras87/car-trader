import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SortDirection, SortField } from '../enums/sort.enum';
import { FoundLocation } from '../google-address-search/google-address-search.component';
import { SearchQuery } from '../interfaces/search';



import { SelectorOptionsService } from '../services/selector-options.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  searchQuery: SearchQuery = {
    brand: null,
    model: null,
    fuel: null,

    yearFrom: null,
    yearTill: null,

    priceFrom: null,
    priceTill: null,

    mileageFrom: null,
    mileageTill: null,

    latitude: null,
    longitude: null,
    locality:null,
    postal_code:null,
    //location: null,
    country: 'DE',

    distance: null,
    sortDirection: SortDirection.descending,
    sortField: SortField.upload,
    sortName: null,

    size: null,
    page: 0,
  }

  constructor(
    private router: Router,
    private selectorOptionsService: SelectorOptionsService,
  ) {  }

  ngOnInit(): void {
    localStorage.removeItem('seenAdID');
  }

  get distances() {
    return this.selectorOptionsService.distanceOptions
  }

  get brands() {
    return this.selectorOptionsService.brandOptions
  }

  get models() {
    return this.selectorOptionsService.modelOptions(this.searchQuery.brand)
  }

  get fuels() {
    return this.selectorOptionsService.fuelOptions;
  }



  get years() {
    return this.selectorOptionsService.yearOptions
  }

  get prices() {
    return this.selectorOptionsService.priceOptions
  }

  get mileages() {
    return this.selectorOptionsService.mileageOptions
  }

  setLocation(foundLocation:FoundLocation) {

    this.searchQuery.longitude = foundLocation.longitude;
    this.searchQuery.latitude = foundLocation.latitude;
    this.searchQuery.postal_code = foundLocation.postal_code;
    this.searchQuery.locality = foundLocation.locality;

    this.searchQuery.distance = (this.searchQuery.longitude && this.searchQuery.latitude && this.searchQuery.locality)?'150':null;
  }

  formSubmission() {

    this.router.navigate(
      ['/search-results'],
      { queryParams: Object.fromEntries(Object.entries(this.searchQuery).filter(([_, v]) => v != null)) }

    );
  }



}
