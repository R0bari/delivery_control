import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.jwt;
    if (accessToken) {
      request = this.addAccessToken(request, this.authService.jwt);
    }

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.authService.signOut()
          .subscribe(response =>
            this.router.navigate(['guest/auth']).then(() => this.authService.clearAuthInfo()));
        const error = err.message || err.statusText;
        return throwError(error);
      }
    }));
  }

  private addAccessToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: accessToken
      }
    });
  }
}
