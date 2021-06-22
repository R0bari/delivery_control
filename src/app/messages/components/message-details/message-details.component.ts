import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from '../../models/Message';
import {NotificationService} from '../../../shared/services/notification.service';
import {AttachedFile} from '../../models/AttachedFile';
import {FilesService} from '../../../shared/services/files.service';
import {DeliveryStatuses} from '../../models/DeliveryStatuses';
import {DeliveryTypes} from '../../models/DeliveryTypes';
import {ContactsService} from '../../../contacts/services/contacts.service';
import {Contact} from 'src/app/contacts/models/Contact';
import {DestinationEmail} from '../../models/DestinationEmail';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDetailsComponent implements OnInit {
  deliveryStatuses = DeliveryStatuses;
  deliveryTypes = DeliveryTypes;
  destinationEmails: { name: string, email: string }[] = [];
  message: Message;
  contacts: Contact[];

  constructor(private messagesService: MessagesService,
              private contactsService: ContactsService,
              private filesService: FilesService,
              private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private notificationServer: NotificationService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.messagesService.getMessage(this.route.snapshot.params.id).toPromise();
    if (!response.isSuccess) {
      this.notificationServer.showError('Информация о сообщении', 'Ошибка при получении информации о сообщении');
      this.backToMessagesList();
    }
    this.message = response.data;
    this.contacts = await this.contactsService.getContacts();
    this.destinationEmails = this.message.destinationEmails.map(de => this.searchContact(de));
    this.cdr.markForCheck();
  }

  backToMessagesList(): void {
    this.router.navigate(['/messages']);
  }

  onDownload(file: AttachedFile): void {
    this.filesService.downloadFile(file);
  }

  determineDeliveryStatusCSSClass(message: Message): string {
    switch (message?.deliveryStatus) {
      case 0:
        return 'successful';
      case 1:
        return 'scheduled';
      case 2:
        return 'failed';
    }
  }

  private searchContact(de: DestinationEmail): any {
    const contact = this.contacts?.find(c => c.contactEmail === de.email);
    if (contact) {
      return {name: contact.contactName, email: de.email};
    }
    return {name: null, email: de.email};
  }
}
