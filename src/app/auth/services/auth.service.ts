import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  controllerUrl = 'auth/';
  tokenKey = 'delivery-control-jwt';
  userKey = 'delivery-control-user';

  constructor(private http: HttpClient,
              private router: Router) { }

  signIn(user: User): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl + 'sign-in', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl + 'sign-up', user);
  }

  signOut(): void {
    this.router.navigate(['guest/auth']).then(() => this.clearAuthInfoFromLocalStorage());
  }

  check(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'check');
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  writeAuthInfoToLocalStorage(response: any): void {
    if (response.isSuccess && response.data != null) {
      localStorage.setItem(this.tokenKey, response.data.token);
      localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
    }
  }

  private clearAuthInfoFromLocalStorage(): void {
    localStorage.setItem(this.tokenKey, null);
    localStorage.setItem(this.userKey, null);
  }
}
