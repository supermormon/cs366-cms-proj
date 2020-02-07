import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { concat } from 'rxjs';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelected = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => {
      return contact.contactId === id;
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }
}
