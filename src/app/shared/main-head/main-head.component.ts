import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-head',
  templateUrl: './main-head.component.html',
  styleUrls: ['./main-head.component.scss']
})
export class MainHeadComponent implements OnInit {
  title = 'Delivery Control';

  constructor() { }

  ngOnInit(): void {
  }

}
