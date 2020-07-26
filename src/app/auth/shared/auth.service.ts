import { Injectable, Output, EventEmitter } from '@angular/core';
import { SignupRequest } from "../sign-up/signup-request";
import { observable, Observable, throwError, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../log-in/login-request';
import { LoginResponse } from '../log-in/login-response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  @Output() username: EventEmitter<string> = new EventEmitter();

  signUpApiEndpoint = environment.apiEndPoint + '/api/auth/signup';

  loginApiEndpoint = environment.apiEndPoint + '/api/auth/login';

  refreshTokenApiEndPoint = environment.apiEndPoint + '/api/auth/refresh/token';

  logoutApiEndPoint = environment.apiEndPoint + '/api/auth/logout';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.httpClient.post(this.signUpApiEndpoint, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.loginApiEndpoint, loginRequest)
      .pipe(
        map(data => {
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('expiresAt', data.experiesAt);

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        }),
        catchError(error => { return of(false); })
      );
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      userName: this.getUserName()
    };

    return this.httpClient.post<LoginResponse>(this.refreshTokenApiEndPoint, refreshTokenPayload).pipe(
      tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        this.localStorage.clear('refreshToken');
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.experiesAt);
        this.localStorage.store('refreshToken', response.refreshToken);
      }),
      catchError(error => {
        throw throwError(error);
      })
    );

  }


  isLoggedIn() {
    if (new Date(this.getExpiresAt() * 1000) <= new Date()) {
      return false;
    }
    else {
      return true;
    }
  }

  logout() {
    const logoutPayload = {
      refreshToken: this.getRefreshToken(),
      userName: this.getUserName()
    };
    this.httpClient.post(this.logoutApiEndPoint, logoutPayload, { responseType: 'text' }).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        throwError(error);
      }
    );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getExpiresAt() {
    return this.localStorage.retrieve('expiresAt');
  }

}
