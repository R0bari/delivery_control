import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Message} from '../../models/Message';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessagesService} from '../../services/messages.service';
import {DeliveryStatuses} from '../../../delivery-services/models/DeliveryStatuses';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesTableComponent implements OnInit {
  tableColumns = ['destinationEmail',
    'theme',
    'scheduleDate',
    'chosenDeliveryServiceId',
    'destinationDate',
    'deliveryStatus',
    'buttons'];
  dataSource: MatTableDataSource<Message>;
  deliveryStatuses: any = {
    0: 'Ожидает',
    1: 'Доставлено',
    2: 'Не доставлено'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public messagesService: MessagesService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource([]);
    this.updateMessagesList();
  }

  ngOnInit(): void { }

  onUpdate(): void {
    this.updateMessagesList();
  }

  onDelete(messageId: number): void {
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
    this.messagesService.getMessages()
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

  determineScheduleDateCSSClass(message: Message): string {
    if (this.isDatePast(message.scheduleDate)) {
      return message.isSent
        ? 'successful'
        : 'failed';
    }
    return message.scheduleDate ? 'future' : '';
  }

  determineDeliveryStatisCSSClass(message: Message): string {
    switch (message.deliveryStatus) {
      case DeliveryStatuses.awaiting: return 'scheduled';
      case DeliveryStatuses.successful: return 'successful';
      case DeliveryStatuses.failed: return 'failed';
    }
  }
  private isDatePast(scheduleDate: Date): boolean {
    return scheduleDate && new Date(scheduleDate) < new Date();
  }

  getDeliveryStatusString(message: Message): string {
    return this.deliveryStatuses[message.deliveryStatus];
  }
}
