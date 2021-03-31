import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateContactDialogComponent>) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form);
    }
    else {
      alert('Не все поля заполнены корректно');
      return;
    }
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
