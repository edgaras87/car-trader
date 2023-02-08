import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"


/**
 * abstract rest api
 */
export class RestService {

  //private base: string = "http://localhost:5000/api";
  private base: string = "http://car-trader-api.eu-central-1.elasticbeanstalk.com/api";

  resource: string = '/'
  protected http: HttpClient = inject(HttpClient)

  get resourceUrl():string {
    return this.base + this.resource
  }

  toQueryString(query: { [key:string]:any }):string {
    return (query) ? Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&'):''
  }

}
