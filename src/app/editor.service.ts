import { Injectable } from '@angular/core';
import { Document } from './interfaces/document';
import docsModel from 'src/models/docs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  content: string = "";
  documents: Document[] = [];
  
  updateContent(content: string) {
    this.content = content;
  }

  getContent() {
    console.log(this.content);
    
  }
}
