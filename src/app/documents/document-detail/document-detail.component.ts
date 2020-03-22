import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WindRefService) { 
      this.nativeWindow = windRef.getNativeWindow();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id != null) {
        this.document = this.documentService.getDocument(id);
        this.documentService.documentChangedEvent.subscribe((documents) => {
          this.document = this.documentService.getDocument(id);
        })
      }
    })

  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document.id);
    this.router.navigate(['/documents']);
  }

}
