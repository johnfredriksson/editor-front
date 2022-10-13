import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { EditorService } from '../editor.service';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { faTrash, faSave, faClose, faUserPlus, faXmarkCircle, faDownload, faPlay, faComment } from '@fortawesome/free-solid-svg-icons';
import { Socket } from "ngx-socket-io";
import { Router } from '@angular/router';

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AuthService } from '../auth.service';

declare let require: any;
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
  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";
  graphQLUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/graphql";
  //

  // EDITOR
  documents?: any;
  document?: any;
  content?: string;
  editor?: Quill;
  mode?: string;
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

  onCodeChanged(value: any): void {
    this.content = value;
  }
  
  constructor(
    public editorService: EditorService,
    private http: HttpClient,
    private socket: Socket,
    private router: Router,
    private authService: AuthService
    ) {  }

    /**
     * Catch the editor in variable editor when created
     * 
     * @param event creation of editor
     */
    created(event: Quill): void {
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
    changedEditor(event: EditorChangeContent | EditorChangeSelection): void {
      this.editor = event["editor"];
      this.editorService.updateContent(this.editor.getContents());
    }

    /**
     * Triggered when a key is pressed while editor is focused
     */
    onKeyUp(): void {
      if (this.document.mode == "code") {
        this.updateSocket({_id: this.document._id, title: this.document.title, content: this.content});
      } else {
        this.updateSocket({_id: this.document._id, title: this.document.title, content: JSON.stringify(this.editor?.getContents()), comments: this.comments});
      }
    }

    /**
     * Fetch all documents from database and display them.
     */
    setDocuments(): void {
      if (this.token) {
        const user = localStorage.getItem("user");
        
        this.documents = this.http.post(this.graphQLUrl,{query: `{ myDocs(user: "${user}") { _id title } sharedDocs(user: "${user}") { _id title }}`})
        .subscribe((result:any)=>{this.documents = result;})
      }
    }

    /**
     * Create a new document and enter it, saves the document to database.
     */
    createDocument(): void {
      if (this.token) {
        this.http.post(this.documentsUrl,
          {title: this.titleNew, content: "", author: this.user, mode: this.modeNew, comments: []},
          {headers: {"x-access-token": this.token}})
        .subscribe({
          next: () => {
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
    updateDocument(): void {
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
    deleteDocument(id: string): void {
      this.http.delete(this.documentsUrl, {body:{_id: id}})
      .subscribe({
        next: () => {
          this.setDocuments()
        }
      })
    }

    /**
     * Update the value for new documents title.
     * 
     * @param event the change in input field
     */
    titleFieldNew(event: any): void {
      this.titleNew = event.target.value;
    }

    /**
     * Update the value for current document title
     * 
     * @param event the change in input field
     */
    titleFieldDocument(event: any): void {
      this.titleDoc = event.target.value;
    }

    /**
     * Update the value for new documents mode
     * 
     * @param event the change in input field
     */
    modeFieldNew(event: any): void {
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
    openDocument(id: any): void {
      this.http.post(this.graphQLUrl,
        {query: `{ document(id: "${id}") { _id title content mode comments { text color ranges author } }}`})
      .subscribe({
        next: (data: any) => {
          const document = data.data.document;

          this.document = document;

          if (document.mode == "code") {
            this.codeModel = {
              language: 'javascript',
              uri: 'main.json',
              value: document.content,
            };
          } else {
            if (document.comments) {
              this.comments = document.comments;
            }
          }
          this.content = document.content;
          this.titleDoc = document.title;
          this.joinSocketRoom(document);
          this.getSocket();
        }
      })
    }

    /**
     * Close current document
     */
    closeDocument(): void {
      this.setDocuments();
      this.document = undefined;
      this.content = undefined;
      this.titleDoc = undefined;
      window.location.reload();
    }

    /**
     * Save as pdf
     */
    async saveAsPdf(): Promise<void> {
      if (this.editor) {
        let html;
        const content = this.editor.getContents();
        if (this.document.mode != "code") {
          this.editor.formatText(0, this.editor.getLength(),
          {background: "transparent"});
          html = htmlToPdfmake(this.editor.root.innerHTML);
        } else {
          html = htmlToPdfmake(this.content);

        }
        const documentDefinition = { content: html, info: { title: this.titleDoc } };

        pdfMake.createPdf(documentDefinition).download(this.titleDoc + ".pdf");
        if (this.document.mode != "code") {this.editor.setContents(content)};
      }
    }

    /**
     * Run code
     * 
     * Encode string in base64, supply it to API,
     * Get response in base64, decode it, log it
     */
    async runCode(): Promise<void> {
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
    comment(): void {
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
    deleteComment(comment: any): void {
      this.comments = this.comments.filter(function(e: any) { return e.color !== comment.color });
      const ranges = JSON.parse(comment.ranges);

      this.editor?.formatText(ranges.index, ranges.length, {
        background: "transparent"
      });

      this.onKeyUp();
    }

    /**
     * Enter a socket room for selected document
     * 
     * @param doc selected document
     */
    joinSocketRoom(doc: any): void {
      this.socket.emit("create", doc["_id"]);
    }

    /**
     * Emit selected document to socket room
     * 
     * @param doc selected document
     */
    updateSocket(doc: any): void {
      this.socket.emit("doc", doc);
    }

    /**
     * Receive socket emits on selected documents socket room
     */
    getSocket(): void {
      this.socket.on("doc", (data: any) => {
        if (this.document.mode == "code") {
          this.codeModel = {
            language: 'javascript',
            uri: 'main.json',
            value: data.content,
          };
          console.log("getting")
        } else {
          this.editor?.setContents(JSON.parse(data.content));
          this.comments = data.comments;
        }
      })
    }

    spitTest(event: any): void {
      this.addField = event
    }

    addUser(id: string): void {
      if (this.token) {
        const newUser = this.addField.srcElement.value;
        const docID = id;
  
        this.http.put((this.documentsUrl+"/invite"),
        {_id: docID, newUser: newUser},
        {headers: {"x-access-token": this.token}})
        .subscribe({
          next: () => {
            console.log("Invited!")
          },
          error: error => {
            if (error.status == 401) {
              this.authService.setInvite({ id: docID, newUser: newUser, user: this.user})
              this.router.navigate(["invite"]);
            }
          }
        })
      }
      }

    /**
     * Functions to fire on init
     */
  ngOnInit(): void {
    this.setDocuments();
  }
}
