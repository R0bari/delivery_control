import {Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder
      .group({
        email: [null],
        password: [null]
      });
  }

  onSignIn(): void {
    const user: User = new User(
      this.form.get('email').value,
      this.form.get('password').value
    );
    this.authService.signIn(user)
      .subscribe(response => this.handleSignInResponse(response));
  }

  toRegPage(): void {
    this.router.navigate(['/guest/registration']);
  }

  private handleSignInResponse(response: any): void {
    if (response.isSuccess) {
      this.authService.writeTokenToLocalStorage(response);
      this.router.navigate(['/']);
    }
  }
}
