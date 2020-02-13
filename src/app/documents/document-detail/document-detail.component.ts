import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id != null) {
        this.document = this.documentService.getDocument(id);
      }
    })
  }

}
