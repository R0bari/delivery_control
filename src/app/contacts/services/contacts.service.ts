import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Contact} from '../models/Contact';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  controllerUrl = 'contacts/';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getContacts(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'user/' + this.authService.currentUser.userId);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertContact(contact: Contact): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl, contact);
  }
}
