import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QuillModule } from 'ngx-quill';
import { EditorService } from '../editor.service';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { faTrash, faSave, faClose } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor(
    private editorService: EditorService,
    private http: HttpClient,
    ) {  }

    created(event: Quill) {
      this.editor = event
    }

    changedEditor(event: EditorChangeContent | EditorChangeSelection) {
      // this.editorService.updateContent(event["editor"]["root"]["innerHTML"]);
      this.editor = event["editor"];
      this.editorService.updateContent(this.editor.getContents())
    }

    setDocuments() {
      this.documents = this.http.get(this.documentsUrl).subscribe((result:any)=>{this.documents = result["data"]})
    }

    createDocument() {
      this.http.post(this.documentsUrl, {title: this.titleNew, content: "testing"})
      .subscribe({
        next: (data:any) => {
          this.document = data["data"];
          console.log("entry created: " + data["data"])

        },
        error: error => {
          console.log(error.message)
        }
      })
    }

    deleteDocument(id: string) {
      console.log(id)
      this.http.delete(this.documentsUrl, {body:{_id: id}})
      .subscribe({
        next: (data:any) => {
          console.log("Delete Successful of id: " + id)
          this.setDocuments()
        }
      })
    }

    updateDocument() {
      console.log(this.document)
      this.http.put<any>(this.documentsUrl, {_id: this.document._id, title: this.document.title, content: this.content, })
      .subscribe((data:any) => console.log(data));
    }

    titleField(event: any) {
      this.titleNew = event.target.value;
      console.log(this.titleNew)
    }

    getDocument(): any {
      return this.document;
    }

    setDocument() {
    this.document = this.documents[0];
    }

    openDocument(document: any) {
      this.document = document;
      this.content = document.content;
      this.seeDocs();
    }

    closeDocument() {
      this.setDocuments();
      this.document = undefined;
      this.content = undefined;
    }

    seeDocs() {
      console.log(this.document)
    }
    

    

  ngOnInit(): void {
    this.setDocuments()
  }


}
