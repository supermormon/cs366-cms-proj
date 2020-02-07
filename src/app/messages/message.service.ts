import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSent = new EventEmitter<Message>();
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
}
