import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {AuthRoutingModule} from './auth-routing.module';
import {RegPageComponent} from './components/reg-page/reg-page.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AuthPageComponent, RegPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AuthModule {
}
