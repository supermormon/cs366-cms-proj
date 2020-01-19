import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = null;
  // {
  //   id: '3',
  //   name: 'Superman',
  //   email: 'kentc@byui.edu',
  //   phone: '999-999-9999',
  //   imageUrl: 'https://imgix-media.wbdndc.net/cms/filer_public/56/ec/56ec1125-438b-48f5-ac54-26b7953c7d5a/superman_profile_1.jpg',
  //   group: null
  // }

  constructor() { }

  ngOnInit() {
  }

}
