import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('form', { static: false }) contactForm: NgForm;
  originalContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(params['id']);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.contact.group) {
        this.groupContacts = this.contact.group.slice();
      }
    })
  }

  onSubmit() {
    let newContact = new Contact(
      '',
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.imageUrl,
      this.groupContacts
    )

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onRemoveItem(index: number) {
    if (index < 0 || index > this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    let invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

}
