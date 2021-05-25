import {Injectable} from '@angular/core';
import {DeliveryService} from '../models/DeliveryService';


@Injectable({
  providedIn: 'root'
})
export class DeliveryServicesService {

  deliveryServices = [
    new DeliveryService('AmazonSES', 0),
    new DeliveryService('SendGrid', 1)
  ];

  constructor() { }

  getDeliveryServices(): DeliveryService[] {
    return this.deliveryServices;
  }
}
