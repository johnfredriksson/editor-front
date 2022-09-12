import { Injectable } from '@angular/core';
import { Documents } from './interfaces/documents';
import docsModel from 'src/models/docs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from './interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  content: string = "";
  currentDocument?: Document;
  documents?: any;
  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";

  constructor(private http: HttpClient) { }

  getDocuments() {
    this.documents = this.http.get(this.documentsUrl).subscribe((result:any)=>{this.documents = result["data"]})
  }

  printDocuments() {
    console.log(this.documents)
  }
  
  updateContent(content: string) {
    this.content = content;
  }

  getContent() {
    console.log(this.content);
    
  }

  setDocuments(Documents: Documents[]) {
    this.documents = Documents;
  }

  getThem(): any {
    return this.documents;
  }
}
