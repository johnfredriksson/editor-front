import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { EditorService } from '../editor.service';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { faTrash, faSave, faClose, faUserPlus, faXmarkCircle, faDownload, faPlay, faComment } from '@fortawesome/free-solid-svg-icons';
import { Socket } from "ngx-socket-io";

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  // ICONS
  faTrash = faTrash;
  faSave = faSave;
  faClose = faClose;
  faUserPlus = faUserPlus;
  faXmarkCircle = faXmarkCircle;
  faDownload = faDownload;
  faPlay = faPlay;
  faComment = faComment;

  // API URLS
  documentsUrlDev = "http://localhost:1337/docs";
  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";
  graphQLUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/graphql";
  //

  // EDITOR
  documents?: any;
  document?: any;
  content?: string;
  editor?: Quill;
  mode?: any;
  comments = <any>[];
  //

  // CREATE A NEW DOC
  titleNew?: any;
  titleDoc?: any;
  modeNew = "text";
  user = localStorage.getItem("user");
  token = localStorage.getItem("token");
  addField?: any;
  //

  // CODE EDITOR
  theme = 'vs-dark';
  codeModel = {
    language: 'javascript',
    uri: 'main.json',
    value: 'console.log("Ready!")',
  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };
  //

  onCodeChanged(value: any) {
    this.content = value;
  }
  
  constructor(
    public editorService: EditorService,
    private http: HttpClient,
    private socket: Socket,
    ) {  }

    /**
     * Catch the editor in variable editor when created
     * 
     * @param event creation of editor
     */
    created(event: Quill) {
      this.editor = event
      if (this.content) {
        this.editor.setContents(JSON.parse(this.content))
      }
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
      if (this.document.mode == "code") {
        this.updateSocket({_id: this.document._id, title: this.document.title, content: this.content});
      } else {
        this.updateSocket({_id: this.document._id, title: this.document.title, content: JSON.stringify(this.editor?.getContents()), comments: this.comments});
      }
    }

    /**
     * Fetch all documents from database and display them.
     */
    setDocuments() {
      if (this.token) {
        const user = localStorage.getItem("user");
        
        this.documents = this.http.post(this.graphQLUrl,{query: `{ myDocs(user: "${user}") { _id title } sharedDocs(user: "${user}") { _id title }}`}).subscribe((result:any)=>{this.documents = result;})
      }
    }

    /**
     * Create a new document and enter it, saves the document to database.
     */
    createDocument() {
      if (this.token) {
        this.http.post(this.documentsUrl,
          {title: this.titleNew, content: "", author: this.user, mode: this.modeNew, comments: []},
          {headers: {"x-access-token": this.token}})
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
    }

    /**
     * Update a document in the database with "PUT".
     */
    updateDocument() {
      if (this.document.mode == "code") {
        this.http.put<any>(this.documentsUrl, {_id: this.document._id, title: this.titleDoc, content: this.content })
        .subscribe();
        this.editorService.updateContent(this.editor?.getContents());
      } else {
        this.http.put<any>(this.documentsUrl, {_id: this.document._id, title: this.titleDoc, content: JSON.stringify(this.editor?.getContents()), comments: this.comments })
        .subscribe();
      }
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
     * Update the value for new documents mode
     * 
     * @param event the change in input field
     */
    modeFieldNew(event: any) {
      this.modeNew = event.target.value;
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
    openDocument(id: any) {
      this.http.post(this.graphQLUrl,{query: `{ document(id: "${id}") { _id title content mode comments { text color ranges author } }}`})
      .subscribe({
        next: (data: any) => {
          const document = data.data.document
          this.document = document;
          console.log(document)
          if (document.mode == "code") {
            this.codeModel = {
              language: 'javascript',
              uri: 'main.json',
              value: document.content,
            };
            this.content = document.content;
          } else {
            // this.editorService.content = document.content;
            // console.log(document.content)
            this.content = document.content;
            if (document.comments) {
              this.comments = document.comments;
            }
            console.log(this.comments)
          }
          // this.content = document.content;
          this.titleDoc = document.title;
          this.joinSocketRoom(document);
          this.getSocket();
        }
      })
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
     * Save as pdf
     */
    async saveAsPdf() {
      if (this.editor) {
        var html = htmlToPdfmake(this.content);
        const documentDefinition = { content: html, info: { title: this.titleDoc } };
        pdfMake.createPdf(documentDefinition).download(this.titleDoc + ".pdf"); 
      }
    }

    /**
     * Run code
     * 
     * Encode string in base64, supply it to API,
     * Get response in base64, decode it, log it
     */
    async runCode() {
      if (this.content) {
        const formatCode = btoa(this.content);

        this.http.post("https://execjs.emilfolino.se/code",
          {code: formatCode},)
        .subscribe({
          next: (data:any) => {
            console.log(atob(data["data"]))
          },
          error: error => {
            console.log(error.message)
          }
        })
      }
    }

    /**
     * Comment function
     */
    comment() {
      console.log(this.comments)
      if (this.editor) {
        const rN = () => {
          return Math.round(Math.random() * (255 - 0));
        }
        const ranges = this.editor.getSelection();
        const comment = prompt("Enter your comment");
        const color = `rgba(${rN()},${rN()},${rN()},0.8)`;
        const commentObject = {
          text: comment,
          color: color,
          ranges: JSON.stringify(ranges),
          author: this.user
        };
        this.comments.push(commentObject);
        this.content = JSON.stringify(this.editor.getContents());

        if (ranges) {
          this.editor.formatText(ranges.index, ranges.length, {
            background: color
          });
        }
        this.onKeyUp();
      }
    }

    /**
     * Delete a comment
     */
    deleteComment(comment: any) {
      this.comments = this.comments.filter(function(e: any) { return e.color !== comment.color });
      const ranges = JSON.parse(comment.ranges);
      this.editor?.removeFormat(ranges.index, ranges.length);
      this.onKeyUp();
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
        if (this.document.mode == "code") {
          this.codeModel = {
            language: 'javascript',
            uri: 'main.json',
            value: data.content,
          };
        } else {
          this.editor?.setContents(JSON.parse(data.content));
          this.comments = data.comments;
        }
      })
    }

    spitTest(event: any) {
      this.addField = event
    }

    addUser(id: string) {
      if (this.token) {
        const newUser = this.addField.srcElement.value;
        const docID = id;
        console.log(newUser)
  
        this.http.put((this.documentsUrl+"/invite"),
        {_id: docID, newUser: newUser},
        {headers: {"x-access-token": this.token}})
        .subscribe({
          next: (data:any) => {
  
          }
        })
      }
      }

    /**
     * Functions to fire on init
     */
  ngOnInit(): void {
    this.setDocuments()
  }


}
