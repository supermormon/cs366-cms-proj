import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  endpoint = 'messages';

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
      this.baseUri + this.endpoint)
      .subscribe((messages) => {
        this.messages = messages;
        this.messageSent.next(this.messages.slice());
        console.log(this.messages);
      });
  }

  addMessage(message: Message) {
    this.http
      .post<Message[]>(this.baseUri + this.endpoint, message)
      .subscribe((messages) => {
        if (messages) {
          this.messages = messages;
          this.messageSent.next(this.messages);
        }
      })
  }
}
