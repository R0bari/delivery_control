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
    const headers = {Accept: 'application/json', Authorization: 'Bearer ' + this.authService.getToken()};
    return this.http.get(
      environment.defaultUrl + this.controllerUrl + 'list',
      {headers});
  }

  deleteContact(id: number): Observable<any> {
    const headers = {Accept: 'application/json', Authorization: 'Bearer ' + this.authService.getToken()};
    return this.http.delete(
      environment.defaultUrl + this.controllerUrl + id,
      {headers});
  }

  insertContact(contact: Contact): Observable<any> {
    const headers = {Accept: 'application/json', Authorization: 'Bearer ' + this.authService.getToken()};
    return this.http.post(
      environment.defaultUrl + this.controllerUrl,
      contact,
      {headers});
  }
}
