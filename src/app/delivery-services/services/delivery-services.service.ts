import {Injectable} from '@angular/core';
import {DeliveryService} from '../models/DeliveryService';


@Injectable({
  providedIn: 'root'
})
export class DeliveryServicesService {

  deliveryServices = [
    new DeliveryService('SMTP', 0),
    new DeliveryService('AmazonSES', 1),
    new DeliveryService('SendGrid', 2)
  ];

  constructor() { }

  getDeliveryServices(): DeliveryService[] {
    return this.deliveryServices;
  }
}
