import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { environment } from "src/environments/environment";


/**
 * abstract rest api
 */
export class RestService {

  private base: string = environment.apiUrl;

  resource: string = '/'
  protected http: HttpClient = inject(HttpClient)

  get resourceUrl():string {
    return this.base + this.resource
  }

  toQueryString(query: { [key:string]:any }):string {
    return (query) ? Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&'):''
  }

}
