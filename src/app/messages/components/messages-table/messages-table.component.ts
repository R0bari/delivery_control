import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Message} from '../../models/Message';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessagesService} from '../../services/messages.service';
import {Router} from '@angular/router';
import { DeliveryStatuses } from '../../models/DeliveryStatuses';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesTableComponent implements OnInit {
  tableColumns = [
    'destinationEmails',
    'theme',
    'scheduleDate',
    'chosenDeliveryServiceId',
    'destinationDate',
    'deliveryStatus',
    'buttons'];
  dataSource: MatTableDataSource<Message>;
  updateIntervalInMs = 10 * 1000;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public messagesService: MessagesService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
    this.dataSource = new MatTableDataSource([]);
    this.updateMessagesList();
    setInterval(() => this.updateMessagesList(), this.updateIntervalInMs);
  }

  ngOnInit(): void { }

  update(): void {
    this.updateMessagesList();
  }

  delete(messageId: number, event: any): void {
    event.stopPropagation();
    this.messagesService.deleteMessage(messageId)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.dataSource.data
            .splice(this.dataSource.data.findIndex(m => m.messageId === messageId), 1);
          this.dataSource._updateChangeSubscription();
          this.cdr.detectChanges();
        }
      });
  }

  updateMessagesList(): void {
    this.messagesService.getMessagesList()
      .subscribe(async (response: any) => {
        if (response.isSuccess) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.markForCheck();
        }
      });
  }

  toLocalDate(dateString: string): string {
    const date = new Date(dateString);
    if (!date) {
      return '';
    }
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  determineDeliveryStatusCSSClass(message: Message): string {
    switch (message.deliveryStatus) {
      case 0: return 'successful';
      case 1: return 'scheduled';
      case 2: return 'failed';
    }
  }

  getDeliveryStatusString(message: Message): string {
    return DeliveryStatuses[message.deliveryStatus];
  }

  goToDetails(row): void {
    this.router.navigate(['/messages/details/' + row.messageId]);
  }

  joinDestinationEmail(destinationEmails: any): string {
    return destinationEmails.map(de => de.email).join('\n');
  }
}
