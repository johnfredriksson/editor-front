import { Injectable } from '@angular/core';
import { Document } from './interfaces/document';
import { Documents } from './interfaces/documents';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Documents> {
    return this.http.get<Documents>(this.documentsUrl);
  }
}
