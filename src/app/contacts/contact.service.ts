import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { concat, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactChangedEvent = new Subject<Contact[]>();
  maxId: number;
  baseUrl = 'https://cit-366-dea88.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => {
      return contact.contactId === id;
    });
  }

  getContacts() {
    return this.contacts.slice();
    // this.http.get<Contact[]>(
    //   this.baseUrl + 'contacts.json')
    //   .subscribe((contacts) => {
    //     console.log(contacts);
    //     this.contacts = contacts;
    //     this.contactChangedEvent.next(this.contacts.slice());
    //   });
  }

  deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => {
      return contact.contactId !== id;
    });
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    // if (newContact) {
    //   this.maxId++;
    //   newContact.contactId = this.maxId.toString();
    //   this.contacts.push(newContact);
    //   this.contactChangedEvent.next(this.contacts.slice());
    // }
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

  private storeContacts() {
    let contacts = JSON.stringify(this.contacts)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(this.baseUrl + 'contacts.json', contacts, {headers: headers})
      .subscribe(res => {
        console.log(res);
      })
  }
}
