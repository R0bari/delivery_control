import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from '../../models/Message';
import {NotificationService} from '../../../shared/services/notification.service';
import {AttachedFile} from '../../models/AttachedFile';
import {FilesService} from '../../../shared/services/files.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDetailsComponent implements OnInit {

  message: Message;

  constructor(private messagesService: MessagesService,
              private filesService: FilesService,
              private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private notificationServer: NotificationService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.messagesService.getMessage(this.route.snapshot.params.id).toPromise();
    if (!response.isSuccess) {
      this.notificationServer.showError('Информация о сообщении', 'Ошибка при получении информации о сообщении');
      this.backToMessagesList();
    }
    this.message = response.data;
    this.cdr.markForCheck();
  }

  backToMessagesList(): void {
    this.router.navigate(['/messages']);
  }

  onDownload(file: AttachedFile): void {
    this.filesService.downloadFile(file);
  }
}
