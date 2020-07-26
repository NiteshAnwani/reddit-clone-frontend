import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LoginResponse } from './auth/log-in/login-response';

@Injectable({ providedIn: "root" })
export class TokenInterceptorInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtToken = '';
  tokenRefreshFlag: boolean = false;

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (req.url.indexOf('signup') !== -1 || req.url.indexOf('login') !== -1 || req.url.indexOf('getallsubreddit') !== -1 || req.url.indexOf('getallpost') !== -1 || req.url.indexOf('getpost') !== -1) {
      return next.handle(req);
    }
   else if (req.url.indexOf('refresh') !== -1 && this.isTokenRefreshing) {
     console.log(req);
      this.jwtToken = this.authService.getJwtToken();
      console.log(this.jwtToken);
      return next.handle(this.addToken(req,this.authService.getJwtToken()));
    }
    else {
      this.jwtToken = this.authService.getJwtToken();
      this.tokenRefreshFlag = ((this.authService.getExpiresAt().valueOf() * 1000 - new Date().valueOf()) / 1000) < 180 ? true : false;
      console.log((this.authService.getExpiresAt().valueOf() * 1000 - new Date().valueOf()) / 1000);
      if (this.jwtToken) {
        if (this.tokenRefreshFlag) {
          if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                this.isTokenRefreshing = false;
                this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
              })
            );
          }
          else {
           return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                return next.handle(this.addToken(req, this.authService.getJwtToken()));
              })
            );
          }
        } 
        else {
          return next.handle(this.addToken(req, this.authService.getJwtToken()));
        }
      }

    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

}
