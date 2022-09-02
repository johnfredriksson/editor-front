import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  content: string = "";
  
  updateContent(content: string) {
    this.content = content;
  }

  getContent() {
    console.log(this.content);
    
  }
}
