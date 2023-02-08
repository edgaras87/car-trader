import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, shareReplay, tap } from 'rxjs';
import { AccountType } from '../enums/user-account-types';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';


export interface User {
  email?:string;
  password?:string;
  account?:AccountType,
  vatNumber?:string
}

interface LoginResponse {
  token: string;
  message: string;
}

interface SignupResponse {
  message: string; //'User registered successfully!'
}

@Injectable({
  providedIn: 'root'
})

export class UserService extends RestService {

  override resource:string = '/auth';

  constructor(private router: Router, private notifier: NotificationService) {
    super();
  }


  signup(user: User): Observable<SignupResponse> {
    return  this.http.post<SignupResponse>(this.resourceUrl +"/signup", user)
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.resourceUrl +"/login", user).pipe(
      tap((logingResponse:LoginResponse) => {
        this.setSession(logingResponse);
      }),
      shareReplay(), // prevent triggering multiple POST request

    );
  }

  logout():void {
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
    this.router.navigate(['/'])
    this.notifier.onWarning('You have been logged out')
  }

  isLoggedIn():boolean {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut():boolean {
    return !this.isLoggedIn()
  }

  private setSession(logingResponse:LoginResponse):void {

    const jwtPayload = JSON.parse(window.atob(logingResponse.token.split('.')[1]))
    const expiresAt = moment.unix(jwtPayload.exp);
    localStorage.setItem('id_token', logingResponse.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

  }

  private getExpiration():moment.Moment {
    const expiration = localStorage.getItem("expires_at")
    const expires_at = JSON.parse(expiration!)
    return moment(expires_at)
  }

}


