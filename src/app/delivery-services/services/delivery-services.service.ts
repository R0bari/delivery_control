import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DeliveryServicesService {
  controllerUrl = 'services/';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getDeliveryServices(): Observable<any> {
    return this.http.get(environment.defaultUrl + this.controllerUrl + 'list');
  }
}
