import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSent = new Subject<Message[]>();
  messages: Message[] = [];
  maxId: number;
  baseUrl = 'https://cit-366-dea88.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessage(id: string): Message {
    let msg = this.messages.find(msg => {
      msg.id === id;
    });
    console.log(msg)
    return msg;
  }

  getMessages() {
    this.http.get<Message[]>(
      this.baseUrl + 'messages.json')
      .subscribe((messages) => {
        this.messages = messages;
        this.maxId = this.getMaxId();
        this.messageSent.next(this.messages.slice());
      });
  }

  private storeMessages() {
    this.http
      .put(this.baseUrl + 'messages.json', this.messages)
      .subscribe(res => {
        this.messageSent.next(this.messages.slice());
        console.log(res);
      })
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  private getMaxId(): number {
    let maxId = this.messages.reduce((acc, curr): number => {
      if (+curr.id > acc) {
        return +curr.id;
      }
    }, 0);
    return maxId;
  }
}
