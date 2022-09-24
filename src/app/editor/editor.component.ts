import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QuillModule } from 'ngx-quill';
import { EditorService } from '../editor.service';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { faTrash, faSave, faClose } from '@fortawesome/free-solid-svg-icons';

import { Socket } from "ngx-socket-io";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  faTrash = faTrash;
  faSave = faSave;
  faClose = faClose;


  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";
  documents?: any;
  document?: any;
  content?: string;
  editor?: Quill;
  titleNew?: any;
  titleDoc?: any;
  
  constructor(
    public editorService: EditorService,
    private http: HttpClient,
    private socket: Socket
    ) {  }

    /**
     * Catch the editor in variable editor when created
     * 
     * @param event creation of editor
     */
    created(event: Quill) {
      this.editor = event
    }

    /**
     * Save changes in editor to content variable.
     * 
     * @param event change in editor
     */
    changedEditor(event: EditorChangeContent | EditorChangeSelection) {
      this.editor = event["editor"];
      this.editorService.updateContent(this.editor.getContents());
    }

    /**
     * Triggered when a key is pressed while editor is focused
     */
    onKeyUp() {
      this.updateSocket({_id: this.document._id, title: this.document.title, content: this.content});
    }

    /**
     * Fetch all documents from database and display them.
     */
    setDocuments() {
      this.documents = this.http.get(this.documentsUrl).subscribe((result:any)=>{this.documents = result})
    }

    /**
     * Create a new document and enter it, saves the document to database.
     */
    createDocument() {
      this.http.post(this.documentsUrl, {title: this.titleNew, content: ""})
      .subscribe({
        next: (data:any) => {
          // this.document = data["data"];
          this.setDocuments()
        },
        error: error => {
          console.log(error.message)
        }
      })
      this.titleDoc = this.titleNew;
    }

    /**
     * Update a document in the database with "PUT".
     */
    updateDocument() {
      this.http.put<any>(this.documentsUrl, {_id: this.document._id, title: this.titleDoc, content: this.content, })
      .subscribe();
    }

    /**
     * Delete a document in the database-
     * 
     * @param id the id of document to be deleted
     */
    deleteDocument(id: string) {
      console.log(id)
      this.http.delete(this.documentsUrl, {body:{_id: id}})
      .subscribe({
        next: (data:any) => {
          this.setDocuments()
        }
      })
    }

    /**
     * Update the value for new documents title.
     * 
     * @param event the change in input field
     */
    titleFieldNew(event: any) {
      this.titleNew = event.target.value;
    }

    /**
     * Update the value for current document title
     * 
     * @param event the change in input field
     */
    titleFieldDocument(event: any) {
      this.titleDoc = event.target.value;
    }

    /**
     * Get a chosen document object
     * 
     * @returns chosen document object
     */
    getDocument(): any {
      return this.document;
    }

    /**
     * Open a document in the editor
     * 
     * @param document chosen document object
     */
    openDocument(document: any) {
      this.document = document;
      this.content = document.content;
      this.editorService.content = document.content;
      this.titleDoc = document.title;
      this.joinSocketRoom(document);
      this.getSocket();
    }

    /**
     * Close current document
     */
    closeDocument() {
      this.setDocuments();
      this.document = undefined;
      this.content = undefined;
      this.titleDoc = undefined;
    }

    /**
     * Enter a socket room for selected document
     * 
     * @param doc selected document
     */
    joinSocketRoom(doc: any) {
      this.socket.emit("create", doc["_id"]);
    }

    /**
     * Emit selected document to socket room
     * 
     * @param doc selected document
     */
    updateSocket(doc: any) {
      this.socket.emit("doc", doc);
    }

    /**
     * Receive socket emits on selected documents socket room
     */
    getSocket() {
      this.socket.on("doc", (data: any) => {
        this.content = data.content;
      })
    }

    /**
     * Functions to fire on init
     */
  ngOnInit(): void {
    this.setDocuments()
  }


}
