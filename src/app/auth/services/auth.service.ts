import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controllerUrl = 'auth/';
  tokenKey = 'delivery-control-jwt';
  userKey = 'delivery-control-user';
  currentUser: User;
  jwt: string;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(this.userKey));
    this.jwt = localStorage.getItem(this.tokenKey);
  }

  signIn(user: User): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl + 'sign-in', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl + 'sign-up', user);
  }

  signOut(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'sign-out');
  }

  check(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'check')
      .pipe(catchError(() => {
        console.log('AUTH CHECK: unauthorized');
        return null;
      }));
  }

  writeAuthInfo(response: any): void {
    if (response.isSuccess && response.data != null) {
      this.jwt = response.data.token;
      this.currentUser = response.data.user;
      localStorage.setItem(this.tokenKey, this.jwt);
      localStorage.setItem(this.userKey, JSON.stringify(this.currentUser));
    }
  }

  clearAuthInfo(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser = null;
    this.jwt = null;
  }
}
