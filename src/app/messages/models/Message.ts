import {DeliveryStatuses} from '../../delivery-services/models/DeliveryStatuses';
import {DeliveryService} from '../../delivery-services/models/DeliveryService';

export class Message {
  messageId: number;
  attachedFiles: any = null;
  theme = '';
  body = '';
  destinationDate: Date = null;
  destinationEmail: string;
  size = 0;
  isHtml = false;
  isScheduled = false;
  scheduleDate: Date = null;
  isSent = false;
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
              userId: any,
              isHtml: boolean) {
    this.theme = theme;
    this.body = body;
    this.destinationEmail = destinationEmail;
    this.isSent = false;
    this.isScheduled = isScheduled;
    this.scheduleDate = scheduleDate;
    this.chosenDeliveryServiceId = chosenDeliveryService.deliveryServiceId;
    this.deliveryStatus = DeliveryStatuses.awaiting;
    this.userId = userId;
    this.isHtml = isHtml;
  }
}
