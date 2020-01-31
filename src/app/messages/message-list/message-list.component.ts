import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1','Subject','This is a message','King Henry IV')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSendMessage(message: Message) {
    this.messages.push(message);
  }

}
