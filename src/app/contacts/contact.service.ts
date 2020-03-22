import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { concat, Subject, Subscribable, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactChangedEvent = new Subject<Contact[]>();
  maxId: number;
  baseUri: string;
  endpoint = 'contacts/';

  constructor(private http: HttpClient,
    private apiService: ApiService) {
    this.baseUri = apiService.getBaseUri();
    this.getContacts();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => {
      return contact.id === id;
    });
  }

  getContacts() {
    this.http.get<Contact[]>(
      this.baseUri + this.endpoint)
      .subscribe((contacts) => {
        console.log('contacts loaded')
        this.contacts = contacts.sort((c1, c2) => {
          let c1Name = c1.name.split(' ');
          let c2Name = c2.name.split(' ');
          let c1Last = c1Name[c1Name.length - 1];
          let c2Last = c2Name[c2Name.length - 1];
          return c1Last >= c2Last ? 1 : -1
        });
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(id: string) {
    if (id) {
      this.http
        .delete(this.baseUri + this.endpoint + id)
        .subscribe(() => {
          this.getContacts();
        });
    }
  }

  addContact(newContact: Contact) {
    // if (newContact) {
    //   this.maxId++;
    //   newContact.id = this.maxId.toString();
    //   this.contacts.push(newContact);
    //   this.storeContacts();
    // }
    if (newContact) {
      this.http
        .post<Contact[]>(this.baseUri + this.endpoint, newContact)
        .subscribe(contacts => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        })
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      // let pos = this.contacts.indexOf(originalContact);
      // if (pos >= 0) {
      //   newContact.id = originalContact.id;
      //   this.contacts[pos] = newContact;
      //   this.storeContacts();
      // }
      this.http
      .put(this.baseUri + `${this.endpoint}/${originalContact.id}`, newContact)
      .subscribe(() => {
        this.getContacts();
      })
    }
  }

  // private getMaxId(): number {
  //   let maxId = this.contacts.reduce((acc, curr): number => {
  //     if (+curr.id > acc) {
  //       return +curr.id;
  //     }
  //   }, 0);  
  //   return maxId;
  // }

  // private storeContacts() {
  //   let contacts = JSON.stringify(this.contacts)
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http.put(this.baseUri + 'contacts.json', contacts, { headers: headers })
  //     .subscribe(res => {
  //       this.contactChangedEvent.next(this.contacts.slice());
  //     })
  // }
}
