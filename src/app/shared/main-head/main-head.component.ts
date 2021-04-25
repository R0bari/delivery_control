import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-head',
  templateUrl: './main-head.component.html',
  styleUrls: ['./main-head.component.scss']
})
export class MainHeadComponent implements OnInit {
  title = 'Delivery Control';
  currentUserEmail: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUserEmail = this.authService.currentUser.email;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
