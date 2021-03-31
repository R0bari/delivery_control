import {Component, OnInit} from '@angular/core';
import {DeliveryService} from '../../models/DeliveryService';
import {DeliveryServicesService} from '../../services/delivery-services.service';

@Component({
  selector: 'app-delivery-services-table',
  templateUrl: './delivery-services-table.component.html',
  styleUrls: ['./delivery-services-table.component.scss']
})
export class DeliveryServicesTableComponent implements OnInit {
  deliveryServices: DeliveryService[] = [];
  tableColumns = ['deliveryServiceLogo', 'deliveryServiceName', 'standartPriority'];

  constructor(public deliveryServicesService: DeliveryServicesService) {
  }

  ngOnInit() {
    this.deliveryServicesService.getDeliveryServices()
      .subscribe((response: any) => this.deliveryServices = response.data);
  }
}
