import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  maxId: number;
  baseUrl = 'https://cit-366-dea88.firebaseio.com/';

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    console.log("got documents!");
  }

  getDocument(id: string) {
    if (id) {
      return this.documents.find(doc => {
        return doc.id === id;
      });
    }
  }

  getDocuments() {
    this.http
      .get<Document[]>(this.baseUrl + 'documents.json')
      .subscribe(documents => {
        this.documents = documents;
        this.maxId = this.getMaxId();
        console.log(this.maxId);
        this.documents = this.documents.sort((d1, d2) => d1.name >= d2.name ? 1 : -1);
        this.documentChangedEvent.next(this.documents.slice());
      }, error => {
        console.log(error);
      });
  }

  private storeDocuments() {
    this.http
      .put(this.baseUrl + 'documents.json', this.documents)
      .subscribe(res => {
        this.maxId = this.getMaxId();
        this.documentChangedEvent.next(this.documents);
        console.log(res);
      })
  }

  deleteDocument(id: string) {
    if (id) {
      this.documents = this.documents.filter(doc => {
        return doc.id !== id;
      });
      this.storeDocuments();
    }
  }

  addDocument(newDocument: Document) {
    if (newDocument) {
      this.maxId++;
      newDocument.id = this.maxId.toString();
      this.documents.push(newDocument);
      this.storeDocuments();
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      let pos = this.documents.indexOf(originalDocument);
      if (pos >= 0) {
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.storeDocuments();
      }
    }
  }

  private getMaxId(): number {
    let maxId = 0; 

    for (let i = 0; i < this.documents.length; i++) {
      if (+this.documents[i].id > maxId) {
        maxId = +this.documents[i].id;
      }
    }
    return maxId;
  }
}
