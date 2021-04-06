import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-head',
  templateUrl: './main-head.component.html',
  styleUrls: ['./main-head.component.scss']
})
export class MainHeadComponent implements OnInit {
  title = 'Delivery Control';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.authService.signOut();
  }
}
