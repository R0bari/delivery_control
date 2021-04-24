import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-greeting-page',
  templateUrl: './greeting-page.component.html',
  styleUrls: ['./greeting-page.component.scss']
})
export class GreetingPageComponent implements OnInit {

  constructor(private authService: AuthService) {
    //  Для проверки авторизованного пользователя
    this.authService.check()
      .subscribe(response => {
        if (!response.successful) {
          console.log('AUTH CHECK: unauthorized');
        }
      });
  }

  ngOnInit(): void {

  }
}
