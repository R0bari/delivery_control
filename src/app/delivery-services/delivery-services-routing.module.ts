import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeliveryServicesPageComponent} from './components/delivery-services-page/delivery-services-page.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryServicesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryServicesRoutingModule { }
