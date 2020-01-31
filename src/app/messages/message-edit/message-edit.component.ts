import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Output() messageSendEvent = new EventEmitter<Message>();
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef;
  currentSender: string = 'John';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    this.messageSendEvent.emit(new Message(
      '', 
      this.subject.nativeElement.value, 
      this.msgText.nativeElement.value,
      this.currentSender
    ));
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
