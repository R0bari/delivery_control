import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  controllerUrl = 'contacts/';

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'list');
  }

  deleteContact(id: number) {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertContact(contact) {
    return this.http.post(environment.defaultUrl + this.controllerUrl, contact);
  }
}
