import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advert } from '../interfaces/advert';
import { SearchQuery, SearchResults } from '../interfaces/search';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertService extends RestService {

  override resource:string = '/advert';

  // used in advert-page
  getById(id:string): Observable<Advert> { return this.http.get<Advert>(this.resourceUrl + '/' + id); }

  getAll(): Observable<Advert[]> { return this.http.get<Advert[]>(this.resourceUrl+'/all') }


  create(advert:Advert): Observable<Advert> {
    return this.http.post<Advert>(this.resourceUrl+'/create',advert);
  }

  search(searchQuery:SearchQuery): Observable<SearchResults> {

    const finalQuery = Object.fromEntries(Object.entries(searchQuery).filter(([_, v]) => v != null))

    if (finalQuery['yearFrom']) finalQuery['yearFrom'] = new Date(finalQuery['yearFrom']).valueOf();
    if (finalQuery['yearTill']) finalQuery['yearTill'] = new Date(finalQuery['yearTill']).valueOf();


    return this.http.get<SearchResults>(this.resourceUrl+'/search?'+this.toQueryString(finalQuery))
  }


  update(advert:Advert): Observable<Advert> {
    return this.http.post<Advert>(this.resourceUrl+'/update', advert);
  }

  publish(advert:Advert): Observable<Advert> {
    return this.http.post<Advert>(this.resourceUrl+'/publish', advert);
  }

  unpublish(advertId:string): Observable<Advert> {
    return this.http.post<Advert>(this.resourceUrl+'/unpublish', advertId);
  }

  delete(id: string): Observable<Advert> {
    return this.http.delete<Advert>(this.resourceUrl + '/' + id)
  }



}












/*
  private toQueryString(params: any) {



    //Object.keys(params).forEach(key => params[key] === null && delete params[key])

    let clone = structuredClone(params);
    Object.keys(clone).forEach(key => clone[key] === null && delete clone[key])



    return Object
      .keys(clone)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(clone[key])}`)
      .join('&')
  }
*/
