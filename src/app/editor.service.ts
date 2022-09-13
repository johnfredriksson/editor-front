import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  content?: any;

  constructor() { }
  
  /**
   * 
   * @param content result of editor content
   */
  updateContent(content: any) {
    this.content = content;
  }
}
