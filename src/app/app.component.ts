import { Component } from '@angular/core';
import {AuthService} from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delivery-control';
  oneMinuteInMs = 100 * 60;

  constructor(private authService: AuthService) {
    this.initAuthChecking();
  }

  private initAuthChecking(): void {
    setInterval(() => this.checkAuth(this.authService), this.oneMinuteInMs);
  }

  private checkAuth(authService: AuthService): void {
    authService.check();
  }
}
