import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GreetingPageComponent} from './components/greeting-page/greeting-page.component';

const routes: Routes = [
  {
    path: '',
    component: GreetingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreetingRoutingModule { }
