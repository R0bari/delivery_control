import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Message} from '../models/Message';
import {AuthService} from '../../auth/services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  controllerUrl = 'messages/';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getMessagesList(): Observable<any> {
    return this.http.get(
      environment.defaultUrl + this.controllerUrl + 'user/' + this.authService.currentUser?.userId);
  }

  getMessage(messageId: number): Observable<any> {
    return this.http.get(
      environment.defaultUrl + this.controllerUrl + messageId
    );
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertMessage(message: Message): Observable<any> {
    return this.http.post(
      environment.defaultUrl + this.controllerUrl, message);
  }
}
