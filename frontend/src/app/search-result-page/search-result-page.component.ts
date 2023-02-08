
import { AfterViewChecked, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Countries } from '../enums/countries.enum';
import { NavigationPaths } from '../enums/navigation-paths.enum';
import { FoundLocation } from '../google-address-search/google-address-search.component';
import { Advert, Image } from '../interfaces/advert';
import { SearchQuery } from '../interfaces/search';
import { AdvertService } from '../services/advert.service';
import { ScrollService } from '../services/scroll.service';
import { SelectorOptionsService } from '../services/selector-options.service';





@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements AfterViewChecked {

  displayAdRoute: NavigationPaths = NavigationPaths.AD_SEARCH;
  ads: Advert[] = [];

  // ========== pagination ================
  pageSizes = [3, 5, 10, 15, 20];
  config?: PaginationInstance;





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

    locality: null,
    postal_code: null,

    //location: null,
    country: null,
    distance: null,

    sortDirection: null,
    sortField: null,
    sortName: null,

    page: 1,
    size: null
  }




  constructor(
    private advertService: AdvertService,
    private route: ActivatedRoute,
    private selectorOptionsService: SelectorOptionsService,
    private router: Router,
    private scrollService: ScrollService) {

    this.loadAdverts();
  }

  ngAfterViewChecked(): void {
    this.scrollBackToPreviosPossition()
  }


  scrollBackToPreviosPossition() {
    const id = localStorage.getItem('seenAdID');
    if (id) {
      const htmlEl = document.getElementById(id);
      if (htmlEl) {
        localStorage.removeItem('seenAdID');
        this.scrollService.scrollToHTMLElement(htmlEl);
      }
    }
  }


  loadAdverts() {

    this.route.queryParams.subscribe((params: Params) => {

      Object.keys(this.searchQuery).forEach(key => {
        if (key in params) this.searchQuery[key as keyof SearchQuery] = params[key];
      });

      this.updateSearchResults();
    });

  }



  reroute() {
    this.router.navigate( ['/search-results'], {  queryParams: this.searchQuery, } );
  }






  // ========== search-form ================

  get brands() {
    return this.selectorOptionsService.brandOptions;
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

  get distances() {
    return this.selectorOptionsService.distanceOptions
  }

  get countryKeys() {
    return Object.keys(Countries);
  }

  countryValue(enumKey: string) {
    return Countries[enumKey as keyof typeof Countries]
  }


  onCountrySelect() {
    if (!this.searchQuery.country) {
      this.searchQuery.latitude = null;
      this.searchQuery.longitude = null;
      this.searchQuery.postal_code = null;
      this.searchQuery.locality = null;
      this.searchQuery.distance = null;
    }
  }

  setLocation(foundLocation: FoundLocation) {

    this.searchQuery.longitude = foundLocation.longitude;
    this.searchQuery.latitude = foundLocation.latitude;
    this.searchQuery.postal_code = foundLocation.postal_code;
    this.searchQuery.locality = foundLocation.locality;

    this.searchQuery.distance = null;
  }


  // ========== search info ==========
  get sortOptions() {
    return Object.keys(this.selectorOptionsService.sortOptions);
  }

  onSortingChange(selected: string) {
    this.searchQuery.sortDirection = (selected) ? this.selectorOptionsService.sortOptions[selected].direction : null
    this.searchQuery.sortField = (selected) ? this.selectorOptionsService.sortOptions[selected].field : null;
    this.handlePageChange(1);
  }

  selectedSortOption(option: string) {
    return (this.searchQuery.sortField === this.selectorOptionsService.sortOptions[option].field &&
      this.searchQuery.sortDirection === this.selectorOptionsService.sortOptions[option].direction)

  }





  // ========== advert ================


  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  additionalImages(images: Image[]) {
    return (images) ? images.filter((_, index) => index > 0 && index < 4) : [];
  }




  sellerName(ad: Advert) {

    const contact = ad?.contactInfo?.contact;
    if (!contact) return null;

    let bucket: string[] = [];
    if (contact.showName) {
      if (contact.title) bucket.push(contact.title)
      if (contact.fisrtName) bucket.push(contact.fisrtName)
      if (contact.lastName) bucket.push(contact.lastName)
    }
    bucket = (bucket.join(' ')) ? [bucket.join(' ')] : [];
    if (contact.accountType) bucket.push(contact.accountType);
    return bucket.join(', ');
  }

  location(ad: Advert) {

    const address = ad?.contactInfo?.address;
    if (!address) return null;

    let bucket: string[] = [];

    if (address.country) bucket.push(address.country);
    if (address.postal_code) bucket.push(address.postal_code);
    bucket = (bucket.join('-')) ? [bucket.join('-')] : [];

    if (address.locality) bucket.push(address.locality);
    //bucket = (bucket.join(' '))? [bucket.join(' ')]:[];



    return bucket.join(' ');

  }






  handlePageChange(event: number): void {
    this.searchQuery.page = event - 1
    this.reroute()
  }

  handlePageSizeChange(event: any): void {
    this.searchQuery.size = event.target.value;
    this.searchQuery.page = 0;
    this.reroute();
  }




  updateSearchResults() {

    this.advertService.search(this.searchQuery).subscribe(
      {
        next: (v) => {

          const { content, pageable, totalElements, size } = v;

          this.ads = content;
          this.searchQuery.size = size;
          this.config = {

            itemsPerPage: pageable.pageSize,
            currentPage: pageable.pageNumber + 1,
            totalItems: totalElements
          };

        }
      }


    );
  }
}







