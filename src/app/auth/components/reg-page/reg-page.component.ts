import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {
  form: FormGroup;
  tokenKey = 'jwt';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder
      .group({
        name: [null],
        secondName: [null],
        email: [null],
        password: [null]
      });
  }

  onSignUp(): void {
    const user: User = {
      userName: this.form.get('name').value,
      userSecondName: this.form.get('secondName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: 0
    };
    this.authService.signUp(user)
      .subscribe(response => this.handleSignUpResponse(response));
  }

  toAuthPage(): void {
    this.router.navigate(['/guest/auth']);
  }

  private handleSignUpResponse(response: any): void {
    if (response.isSuccess) {
      this.authService.writeTokenToLocalStorage(response);
      this.router.navigate(['/']);
    }
  }
}
