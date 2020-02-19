import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSent = new Subject<Message[]>();
  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessage(id: string): Message {
    let msg = this.messages.find(msg => {
      msg.messageId === id;
    });
    console.log(msg)
    return msg;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageSent.next(this.messages.slice());
  }
}
