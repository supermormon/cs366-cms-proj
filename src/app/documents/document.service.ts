import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocument(id: string) {
    return this.documents.find(doc => {
      return doc.documentId === id;
    });
  }

  getDocuments() {
    return this.documents.slice();
  }
}
