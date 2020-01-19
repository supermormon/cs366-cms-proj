import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit { 
  contacts: Contact[] = [
    new Contact(
      '1', 
      'Bro. Huntington', 
      'bh@byui.edu', 
      '209-345-1234', 
      'http://www.minneapolisheadshots.com/gallery/main/professionalbusinessheadshot.jpg', 
      null,
      ),
    new Contact(
      "2",
      "Bro. Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      "https://web.byui.edu/Directory/Employee/barzeer.jpg",
      null
    )
  ]

  constructor() {

  }

  ngOnInit() {
  }

}
