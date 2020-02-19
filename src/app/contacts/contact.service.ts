import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { concat, Subject } from 'rxjs';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactChangedEvent = new Subject<Contact[]>();
  maxId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => {
      return contact.contactId === id;
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => {
      return contact.contactId !== id;
    });
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (newContact) {
      this.maxId++;
      newContact.contactId = this.maxId.toString();
      this.contacts.push(newContact);
      this.contactChangedEvent.next(this.contacts.slice());
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      let pos = this.contacts.indexOf(originalContact);
      if (pos >= 0) {
        newContact.contactId = originalContact.contactId;
        this.contacts[pos] = newContact;
        this.contactChangedEvent.next(this.contacts.slice());
      }
    }
  }

  private getMaxId(): number {
    let maxId = this.contacts.reduce((acc, curr): number => {
      if (+curr.contactId > acc) {
        return +curr.contactId;
      }
    }, 0);
    return maxId;
  }
}
