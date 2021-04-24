import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Contact} from '../../models/Contact';
import {ContactsService} from '../../services/contacts.service';
import {CreateContactDialogComponent} from '../create-contact-form/create-contact-dialog.component';
import {NotificationService} from '../../../shared/services/notification.service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  tableColumns = ['contactName', 'contactEmail', 'buttons'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactsService: ContactsService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private notificationService: NotificationService,
              public dialog: MatDialog) {
    this.updateContacts();
  }

  ngOnInit(): void {
  }

  add(): void {
    this.dialog.open(CreateContactDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe(result => {
      if (result) {
        const contact: Contact = {
          contactId: null,
          contactName: result.get('contactName').value,
          contactEmail: result.get('contactEmail').value,
          userId: this.authService.currentUser.userId
        };
        this.contactsService.insertContact(contact)
          .subscribe((response: any) => {
            if (response.isSuccess) {
              this.updateContacts();
              this.notificationService.showSuccess('Успешное создание контакта', 'Контакт успешно создан');
            }
          });
      }
    });
  }

  update(): void {
    this.updateContacts();
  }

  delete(contactId: number): void {
    this.contactsService.deleteContact(contactId)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.dataSource.data
            .splice(this.dataSource.data.findIndex(c => c.contactId === contactId), 1);
          this.dataSource._updateChangeSubscription();
          this.cdr.detectChanges();
        }
      });
  }

  updateContacts(): void {
    this.contactsService.getContacts()
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
        }
      });
  }
}
