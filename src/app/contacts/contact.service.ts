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
    this.getContacts();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => {
      return contact.id === id;
    });
  }

  getContacts() {
    this.http.get<Contact[]>(
      this.baseUrl + 'contacts.json')
      .subscribe((contacts) => {
        // console.log(contacts);
        console.log('contacts loaded')
        this.contacts = contacts.sort((c1, c2) => {
          let c1Name = c1.name.split(' ');
          let c2Name = c2.name.split(' ');
          let c1Last = c1Name[c1Name.length - 1];
          let c2Last = c2Name[c2Name.length - 1];
          return c1Last >= c2Last ? 1 : -1
        });
        this.maxId = this.getMaxId();
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => {
      return contact.id !== id;
    });
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (newContact) {
      this.maxId++;
      newContact.id = this.maxId.toString();
      this.contacts.push(newContact);
      this.storeContacts();
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      let pos = this.contacts.indexOf(originalContact);
      if (pos >= 0) {
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.storeContacts();
      }
    }
  }

  private getMaxId(): number {
    let maxId = this.contacts.reduce((acc, curr): number => {
      if (+curr.id > acc) {
        return +curr.id;
      }
    }, 0);
    return maxId;
  }

  private storeContacts() {
    let contacts = JSON.stringify(this.contacts)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.baseUrl + 'contacts.json', contacts, { headers: headers })
      .subscribe(res => {
        this.contactChangedEvent.next(this.contacts.slice());
      })
  }
}
