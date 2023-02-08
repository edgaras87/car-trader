import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logError(error: any) {
    // Send errors to server here
    //console.log(error);

  }

}
