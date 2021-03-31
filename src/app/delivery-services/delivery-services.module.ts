import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryServicesPageComponent} from './components/delivery-services-page/delivery-services-page.component';
import {DeliveryServicesRoutingModule} from './delivery-services-routing.module';
import {DeliveryServicesTableComponent} from './components/delivery-services-table/delivery-services-table.component';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DeliveryServicesPageComponent, DeliveryServicesTableComponent],
    imports: [
        CommonModule,
        DeliveryServicesRoutingModule,
        MatTableModule,
        SharedModule
    ]
})
export class DeliveryServicesModule {
}
