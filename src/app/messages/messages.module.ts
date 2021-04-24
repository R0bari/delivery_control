import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesPageComponent} from './components/messages-page/messages-page.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {MessagesTableComponent} from './components/messages-table/messages-table.component';
import {SharedModule} from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {CreateMessageFormComponent} from './components/create-message-form/create-message-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageDetailsComponent} from './components/message-details/message-details.component';

@NgModule({
  declarations: [MessagesPageComponent, MessagesTableComponent, CreateMessageFormComponent, MessageDetailsComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MessagesModule {
}
