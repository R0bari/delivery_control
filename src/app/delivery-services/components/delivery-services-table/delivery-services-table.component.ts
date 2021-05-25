import {Component, OnInit} from '@angular/core';
import {DeliveryService} from '../../models/DeliveryService';
import {DeliveryServicesService} from '../../services/delivery-services.service';

@Component({
  selector: 'app-delivery-services-table',
  templateUrl: './delivery-services-table.component.html',
  styleUrls: ['./delivery-services-table.component.scss']
})
export class DeliveryServicesTableComponent implements OnInit {
  tableColumns = ['deliveryServiceLogo', 'deliveryServiceName', 'standartPriority'];

  deliveryServices: DeliveryService[] = [];

  constructor(private deliveryServicesService: DeliveryServicesService) {
  }

  ngOnInit(): void {
    this.deliveryServices = this.deliveryServicesService.getDeliveryServices();
  }
}
