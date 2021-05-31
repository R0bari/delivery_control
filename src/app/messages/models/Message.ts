import {DeliveryStatuses} from '../../delivery-services/models/DeliveryStatuses';
import {DeliveryService} from '../../delivery-services/models/DeliveryService';
import {AttachedFile} from './AttachedFile';
import {DestinationEmail} from './DestinationEmail';

export class Message {
  messageId: number;
  attachedFiles: AttachedFile[] = [];
  theme = '';
  body = '';
  creationDate = new Date();
  destinationDate: Date = null;
  destinationEmails: DestinationEmail[] = [];
  isHtml = false;
  isScheduled = false;
  scheduleDate: Date = null;
  isSent = false;
  deliveryQueueId: any = 2;
  deliveryQueue = null;
  chosenDeliveryService: DeliveryService = null;
  chosenDeliveryServiceId: number;
  usedDeliveryServiceId: number = null;
  deliveryStatus: DeliveryStatuses = 0;
  userId;

  constructor(theme: string,
              body: string,
              destinationEmails: DestinationEmail[],
              chosenDeliveryService: DeliveryService,
              isScheduled: boolean,
              scheduleDate: any,
              userId: any,
              isHtml: boolean) {
    this.theme = theme;
    this.body = body;
    this.destinationEmails = destinationEmails;
    this.isSent = false;
    this.isScheduled = isScheduled;
    this.scheduleDate = scheduleDate;
    this.chosenDeliveryServiceId = chosenDeliveryService.deliveryServiceId;
    this.deliveryStatus = DeliveryStatuses.awaiting;
    this.userId = userId;
    this.isHtml = isHtml;
  }

  addAttachments(files: AttachedFile[]): void {
    files.forEach(file => this.addAttachment(file));
  }

  addAttachment(file: AttachedFile): void {
    this.attachedFiles.push(file);
  }
}
