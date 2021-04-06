import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Contact} from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  controllerUrl = 'contacts/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'list');
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertContact(contact: Contact): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl, contact);
  }
}
