import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DeliveryService} from '../../../delivery-services/models/DeliveryService';
import {DeliveryServicesService} from '../../../delivery-services/services/delivery-services.service';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../models/Message';
import {NotificationService} from '../../../shared/services/notification.service';
import {AuthService} from '../../../auth/services/auth.service';
import {AttachedFile} from '../../models/AttachedFile';

@Component({
  selector: 'app-create-message-form',
  templateUrl: './create-message-form.component.html',
  styleUrls: ['./create-message-form.component.scss']
})
export class CreateMessageFormComponent implements OnInit {
  form: FormGroup;
  deliveryServices: DeliveryService[] = [];
  chosenDeliveryService: any;
  isScheduled = false;
  minScheduleDate: Date = new Date();
  maxScheduleDate: Date = new Date('2031/01/01');
  isHtml = false;
  files: AttachedFile[] = [];

  constructor(private formBuilder: FormBuilder,
              private deliveryServicesService: DeliveryServicesService,
              private authService: AuthService,
              private messagesService: MessagesService,
              private notificationService: NotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.updateDeliveryServicesSelectList();
  }

  public changeScheduledEnable(): void {
    this.isScheduled = !this.isScheduled;
    if (!this.isScheduled) {
      this.form.get('scheduleDate').patchValue(null);
    }
  }

  public submit(): void {
    if (!this.form.valid) {
      alert('Не все поля заполнены корректно');
      return;
    }
    this.checkForm();

    const message: Message = this.createMessageFromForm();

    this.messagesService.insertMessage(message)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.router.navigate(['/messages']).then(() =>
            this.notificationService.showSuccess('Письмо создано', 'Письмо успешно создано'));
          return;
        }
        this.notificationService.showError('Ошибка', 'Ошибка при создании письма');
      });
  }

  private createMessageFromForm(): Message {
    return new Message(
      this.form.get('theme')
        .value,
      this.form.get('body')
        .value,
      this.form.get('destinationEmail')
        .value.toLowerCase(),
      this.form.get('chosenDeliveryService')
        .value,
      this.isScheduled,
      this.form.get('scheduleDate')
        .value,
      this.authService.currentUser.userId,
      this.form.get('isHtml')
        .value
    );
  }

  private createForm(): FormGroup {
    return this.formBuilder
      .group({
        theme: [null],
        body: [null],
        isHtml: [false],
        destinationEmail: [null, Validators.required],
        chosenDeliveryService: [null],
        scheduleDate: [null]
      });
  }

  private checkForm(): void {
    if (!this.form.value.theme) {
      this.form.get('theme').patchValue('Без темы');
    }
    if (!this.form.value.body) {
      this.form.get('body').patchValue('Без текста');
    }
    if (!this.form.value.isHtml) {
      this.form.get('isHtml').patchValue(false);
    }
    if (!this.form.value.chosenDeliveryService) {
      this.form.get('chosenDeliveryService').patchValue(this.deliveryServices[0]);
    }
  }

  public updateDeliveryServicesSelectList(): void {
    this.deliveryServices = this.deliveryServicesService.getDeliveryServices();
  }

  addFile(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(event);
      console.log(reader.result);
      const fileType = this.parseFileData(reader.result as string);
      const content = this.parseFileContent(reader.result as string);
      console.log({fileType, content});
    };
  }

  private parseFileData(result: string): string {
    return result.substring(0, result.indexOf(';'));
  }

  private parseFileContent(result: string): string {
    return result.substring(result.indexOf(',') + 1);
  }

  removeFile(id: number): void {
    const index = this.files.findIndex(f => f.id === id);
    this.files.splice(index, 1);
  }
}
