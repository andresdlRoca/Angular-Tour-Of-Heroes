import { Component } from '@angular/core';
import { MessageService } from '../message.service'; // The MessagesComponent should display all messages, including the message sent by the HeroService when it fetches heroes.  

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  
  constructor(public messageService: MessageService) { }
}
