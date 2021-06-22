import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
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

  async getContacts(): Promise<Contact[]> {
    const response = await this.http.get<any>(
      environment.defaultUrl + this.controllerUrl + 'user/' + this.authService.currentUser.userId).toPromise();
    if (!response?.isSuccess) {
      return null;
    }
    return response.data;
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertContact(contact: Contact): Observable<any> {
    return this.http.post(environment.defaultUrl + this.controllerUrl, contact);
  }
}
