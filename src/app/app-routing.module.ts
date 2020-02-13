import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full'},
  { path: 'documents', component: DocumentsComponent, children: [
    { path: ':id', component: DocumentDetailComponent }
  ]},
  { path: 'messages', component: MessageListComponent},
  { path: 'contacts', component: ContactsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }