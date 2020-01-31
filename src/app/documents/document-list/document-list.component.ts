import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents = [
    new Document('1', 'Document 1: The Road to Cavalon', 'This is a document that does not exist in this world', 'url', []),
    new Document('2', 'Document 2', 'Document 2', 'url', []),
    new Document('3', 'Document 3', 'Document 3', 'url', []),
    new Document('4', 'Document 4', 'Document 4', 'url', []),
  ]

  @Output() documentSelectedEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit() {
  }

  onSelectDocument(selectedDocument: Document) {
    console.log(selectedDocument);
    this.documentSelectedEvent.emit(selectedDocument);
  }

}
