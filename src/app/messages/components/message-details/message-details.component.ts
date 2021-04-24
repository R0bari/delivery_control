import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from '../../models/Message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  message: Message;

  constructor(private messagesService: MessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.messagesService.getMessage(this.route.snapshot.params.id)
      .subscribe(response => {
        if (response.isSuccess) {
          this.message = response.data;
        }
      });
  }

  backToMessagesList(): void {
    this.router.navigate(['/messages']);
  }
}
