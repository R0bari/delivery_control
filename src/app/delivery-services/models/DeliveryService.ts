export class DeliveryService {
  deliveryServiceId: number;
  deliveryServiceName: string;
  standartPriority: number;
  imgPath: string;

  constructor(deliveryServiceName: string, standartPriority: number) {
    this.deliveryServiceName = deliveryServiceName;
    this.standartPriority = standartPriority;
  }
}
