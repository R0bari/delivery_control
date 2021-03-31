import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingPageComponent } from './components/greeting-page/greeting-page.component';
import {SharedModule} from '../shared/shared.module';
import {GreetingRoutingModule} from './greeting-routing.module';



@NgModule({
  declarations: [GreetingPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    GreetingRoutingModule
  ]
})
export class GreetingModule { }
