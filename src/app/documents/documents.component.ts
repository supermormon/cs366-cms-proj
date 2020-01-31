import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor() { }

  ngOnInit() {
    console.log('Document component!');
  }

  onSelectDocument(document: Document) {
    console.log(document);
    this.selectedDocument = document;
  }

}
