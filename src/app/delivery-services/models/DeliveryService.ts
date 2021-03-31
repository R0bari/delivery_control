export class DeliveryService {
  deliveryServiceId: number;
  deliveryServiceName: string;
  standartPriority: number;
  connectionString: string;

  constructor(deliveryServiceName: string, standartPriority: number, connectionString: string) {
    this.deliveryServiceName = deliveryServiceName;
    this.standartPriority = standartPriority;
    this.connectionString = connectionString;
  }
}
