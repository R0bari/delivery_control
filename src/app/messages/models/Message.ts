import {DeliveryStatuses} from '../../delivery-services/models/DeliveryStatuses';
import {DeliveryService} from '../../delivery-services/models/DeliveryService';

export class Message {
  messageId: number;
  attachedFiles: any = null;
  theme: string;
  body: string;
  destinationDate: Date = null;
  destinationEmail: string;
  size = 0;
  isScheduled: boolean;
  scheduleDate: Date = null;
  isSent: boolean;
  deliveryQueueId: any = 2;
  chosenDeliveryService: DeliveryService = null;
  chosenDeliveryServiceId: number;
  usedDeliveryServiceId: number = null;
  deliveryStatus: DeliveryStatuses = 0;
  userId;

  constructor(theme: string,
              body: string,
              destinationEmail: string,
              chosenDeliveryService: DeliveryService,
              isScheduled: boolean,
              scheduleDate: any,
              userId: any) {
    this.theme = theme;
    this.body = body;
    this.destinationEmail = destinationEmail;
    this.isSent = false;
    this.isScheduled = isScheduled;
    this.scheduleDate = scheduleDate;
    this.chosenDeliveryServiceId = chosenDeliveryService.deliveryServiceId;
    this.deliveryStatus = DeliveryStatuses.awaiting;
    this.userId = userId;
  }
}
