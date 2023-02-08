import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specification, SpecificationModels, SpecificationRequest } from '../interfaces/specification';
import { RestService } from './rest.service';




@Injectable()
export class SpecificationService extends RestService {

  override resource:string = '/specifications';

  specificationModels(): Observable<SpecificationModels[]> {
    const url = this.resourceUrl + '/models';
    return this.http.get<SpecificationModels[]>(url);
  }

  specifications(specificationRequest:SpecificationRequest): Observable<Specification[]> {
    const url = this.resourceUrl + '?' + this.toQueryString(specificationRequest);
    return this.http.get<Specification[]>(url);
  }

}
