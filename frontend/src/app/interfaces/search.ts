import { Advert } from "./advert";
import { SortDirection, SortField } from "../enums/sort.enum";

export interface SearchResults {
  content: Advert[];
  pageable: {
    pageSize: number;
    pageNumber: number;
  }
  totalElements: number;
  size: number;

}

export interface SearchQuery {
    brand: string | null;
    model: string | null;
    fuel: string | null;
    yearFrom: string | null;
    yearTill: string | null;
    priceFrom: string | null;
    priceTill: string | null;
    mileageFrom: string | null;
    mileageTill: string | null;

    page:  number | null;
    size:  number | null;

    latitude: string | null;
    longitude: string | null;
    locality: string | null;
    postal_code: string | null;

    //location: string | null;
    country: string | null;
    distance: string | null;
    sortDirection: SortDirection | null;
    sortField: SortField | null;
    sortName: string | null;
}









