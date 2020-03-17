import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSent = new Subject<Message[]>();
  messages: Message[] = [];
  maxId: number;
  baseUri: string;

  constructor(private http: HttpClient,
    private apiService: ApiService) {
    this.baseUri = apiService.getBaseUri();
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
      this.baseUri + 'messages.json')
      .subscribe((messages) => {
        this.messages = messages;
        this.maxId = this.getMaxId();
        this.messageSent.next(this.messages.slice());
      });
  }

  private storeMessages() {
    this.http
      .put(this.baseUri + 'messages.json', this.messages)
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
