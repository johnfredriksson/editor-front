import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  content?: any;
  constructor(private socket: Socket) { }
  
  /**
   * 
   * @param content result of editor content
   */
  updateContent(content: any) {
    this.content = content;
  }
}
