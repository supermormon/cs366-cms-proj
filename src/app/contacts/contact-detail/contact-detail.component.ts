import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = null;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.contact = this.contactService.getContact(params['id']);
          this.contactService.contactChangedEvent.subscribe((contacts) => {
            this.contact = this.contactService.getContact(params['id']);
          })
        }
      })
  }

  onDelete() {
    this.contactService.deleteContact(this.contact.id);
    this.router.navigate(['/contacts']);
  }

}
