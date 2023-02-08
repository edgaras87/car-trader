import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientErrorMessage(error: Error): string {

    return error.message ?
      error.message :
      error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
    this.errorMessageByHttpStatusCode(error) :
      'No Internet Connection';
  }


  private errorMessageByHttpStatusCode(error: HttpErrorResponse) {

    let errorMessage = '';
    switch (error.status) {

      case HttpStatusCode.BadRequest:
        errorMessage = 'Bad request to server. Missing data and/or invalid formatting.'
        break;
      case HttpStatusCode.Unauthorized:

        //`Authorization problems. We are working on that`
        errorMessage = (error.error?.message) ? error.error.message : `Authorization problems.`;
        break;
      case HttpStatusCode.UnprocessableEntity:
        errorMessage = `Information that you provided cannot be procesed. We are working on that.`;
        break;
      case HttpStatusCode.Forbidden:
        errorMessage = `You dont have premission to this resource.`;
        break;

      case HttpStatusCode.Conflict:
        errorMessage = (error.error?.message)?error.error?.message: `Data conflict. We are working on that`;
        break;
      case HttpStatusCode.NotFound:
        errorMessage = `Resource cannot be found on server.`;
        break;
      case HttpStatusCode.Gone:
        errorMessage = `Resource you are looking for is no more available.`;
        break;

      default:
        errorMessage = `Something went wrong...We are working on that`;
    }
    return errorMessage;
  }





}
