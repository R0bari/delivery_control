import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateContactDialogComponent} from './components/create-contact-form/create-contact-dialog.component';
import {ContactsRoutingModule} from './contacts-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ContactsPageComponent, ContactsTableComponent, CreateContactDialogComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    SharedModule
  ]
})
export class ContactsModule { }
