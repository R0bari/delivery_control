import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controllerUrl = 'auth/';
  tokenKey = 'jwt';

  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<any> {
    return this.http.post(
      environment.defaultUrl + this.controllerUrl + 'sign-in', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(
      environment.defaultUrl + this.controllerUrl + 'sign-up', user);
  }

  signOut(): void {
    localStorage.setItem(this.tokenKey, null);
  }

  writeTokenToLocalStorage(response: any): void {
    if (response.isSuccess) {
      console.log(response);
      localStorage.setItem(this.tokenKey, response.data.token);
    }
  }
}
