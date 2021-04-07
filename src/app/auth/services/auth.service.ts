import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controllerUrl = 'auth/';
  tokenKey = 'jwt';

  constructor(private http: HttpClient,
              private router: Router,
              private notificationService: NotificationService) { }

  signIn(user: User): Observable<any> {
    return this.http.post(
      environment.defaultUrl + this.controllerUrl + 'sign-in', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(
      environment.defaultUrl + this.controllerUrl + 'sign-up', user);
  }

  signOut(): void {
    this.router.navigate(['guest/auth']).then(() => localStorage.setItem(this.tokenKey, null));
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  writeTokenToLocalStorage(response: any): void {
    if (response.isSuccess) {
      console.log(response);
      localStorage.setItem(this.tokenKey, response.data.token);
    }
  }
}
