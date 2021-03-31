import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Message} from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  controllerUrl = 'messages/';

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'list');
  }

  deleteMessage(id: number) {
    return this.http.delete(environment.defaultUrl + this.controllerUrl + id);
  }

  insertMessage(message: Message) {
    return this.http.post(environment.defaultUrl + this.controllerUrl, message);
  }
}
