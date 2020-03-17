import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private msgService: MessageService,
    private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.getContacts();
    this.msgService.getMessages();
    this.subscription = this.msgService.messageSent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSendMessage(message: Message) {
    this.msgService.addMessage(message);
  }

}
