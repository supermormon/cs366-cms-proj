import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]: string): any {

    let newContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(term);
    });
    if (newContacts.length < 1) {
      return contacts;
    }
    return newContacts;
  }
}
