import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Messages component!');
  }

}
