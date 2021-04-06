import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {RegPageComponent} from './components/reg-page/reg-page.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'registration',
    component: RegPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
