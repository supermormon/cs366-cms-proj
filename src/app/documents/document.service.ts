import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  baseUri: string;
  endpoint = 'documents';

  constructor(private http: HttpClient,
    private apiService: ApiService) {
    this.baseUri = apiService.getBaseUri();
    this.getDocuments();
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
      .get<Document[]>(this.baseUri + this.endpoint)
      .subscribe(documents => {
        this.documents = documents;
        this.documents = this.documents.sort((d1, d2) => d1.name >= d2.name ? 1 : -1);
        this.documentChangedEvent.next(this.documents.slice());
      }, error => {
        console.log(error);
      });
  }

  deleteDocument(id: string) {
    if (id) {
      this.http
        .delete(this.baseUri + `${this.endpoint}/${id}`)
        .subscribe(() => {
          this.getDocuments();
        });
    }
  }

  addDocument(newDocument: Document) {
    if (newDocument) {
      this.http
        .post<Document[]>(this.baseUri + this.endpoint, newDocument)
        .subscribe(documents => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        })
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      this.http
        .put(this.baseUri + `${this.endpoint}/${originalDocument.id}`, newDocument)
        .subscribe(() => {
          this.getDocuments();
        })
    }
  }

}
