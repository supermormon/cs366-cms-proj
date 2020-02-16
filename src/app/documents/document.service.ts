import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }


  getDocument(id: string) {
    if (id) {
      return this.documents.find(doc => {
        return doc.documentId === id;
      });
    }
  }

  getDocuments() {
    return this.documents.slice();
  }

  deleteDocument(id: string) {
    if (id) {
      this.documents = this.documents.filter(doc => {
        return doc.documentId !== id;
      });
      this.documentChangedEvent.emit(this.documents.slice());
    }
  }
}
