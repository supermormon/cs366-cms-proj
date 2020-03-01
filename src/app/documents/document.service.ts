import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  maxId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
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
      this.documentChangedEvent.next(this.documents.slice());
    }
  }

  addDocument(newDocument: Document) {
    if (newDocument) {
      this.maxId++;
      newDocument.documentId = this.maxId.toString();
      this.documents.push(newDocument);
      this.documentChangedEvent.next(this.documents.slice());
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      let pos = this.documents.indexOf(originalDocument);
      if (pos >= 0) {
        newDocument.documentId = originalDocument.documentId;
        this.documents[pos] = newDocument;
        this.documentChangedEvent.next(this.documents.slice());
      }
    }
  }

  private getMaxId(): number {
    let maxId = this.documents.reduce((acc, curr): number => {
      if (+curr.documentId > acc) {
        return +curr.documentId;
      }
    }, 0);
    return maxId;
  }
}
