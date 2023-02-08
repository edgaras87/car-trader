import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * intercept app HttpRequest
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  /**
  * include token in HttpRequest headers
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token")

    if (idToken) {
      const cloned = req.clone({ headers: req.headers.set("Authorization", "Bearer " + idToken) })
      return next.handle(cloned)
    } else {
      return next.handle(req)
    }

  }
}
