import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DeliveryService} from '../../../delivery-services/models/DeliveryService';
import {DeliveryServicesService} from '../../../delivery-services/services/delivery-services.service';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../models/Message';
import {NotificationService} from '../../../shared/services/notification.service';

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
  isDeliveryServiceChosen = false;

  constructor(private formBuilder: FormBuilder,
              private deliveryServicesService: DeliveryServicesService,
              private messagesService: MessagesService,
              private notificationService: NotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.updateDeliveryServices();
  }

  public onScheduledEnableChange(): void {
    this.isScheduled = !this.isScheduled;
    if (!this.isScheduled) {
      this.form.get('scheduleDate').patchValue(null);
    }
  }

  public onDeliveryServiceChosenEnableChange(): void {
    this.isDeliveryServiceChosen = !this.isDeliveryServiceChosen;
    if (!this.isDeliveryServiceChosen) {
      this.form.get('chosenDeliveryService').patchValue(null);
    }
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      alert('Не все поля заполнены корректно');
      return;
    }
    this.checkForm();

    const message: Message = new Message(
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
        .value
    );

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

  private createForm(): FormGroup {
    return this.formBuilder
      .group({
        theme: [null],
        body: [null],
        htmlEnabled: [null],
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
    if (!this.form.value.htmlEnabled) {
      this.form.get('htmlEnabled').patchValue(false);
    }
    if (!this.form.value.chosenDeliveryService) {
      this.form.get('chosenDeliveryService').patchValue(this.deliveryServices[0]);
    }
  }

  public updateDeliveryServices(): void {
    this.deliveryServicesService
      .getDeliveryServices()
      .subscribe((response: any) => this.deliveryServices = response.data);
  }

}
