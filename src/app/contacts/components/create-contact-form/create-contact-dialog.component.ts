import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../shared/services/notification.service';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<CreateContactDialogComponent>) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form);
      this.notificationService.showSuccess('Успешное создание контакта', 'Контакт успешно создан');
      return;
    }
    this.notificationService.showError('Ошибка', 'Ошибка при создании контакта');
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      contactName: [null, Validators.required],
      contactEmail: [null, Validators.required]
    });
  }
}
