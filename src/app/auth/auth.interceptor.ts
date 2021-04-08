import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    if (accessToken) {
      request = this.addAccessToken(request, accessToken);
    }

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.authService.signOut();
        const error = err.message || err.statusText;
        return throwError(error);
      }
    }));
  }

  private addAccessToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
