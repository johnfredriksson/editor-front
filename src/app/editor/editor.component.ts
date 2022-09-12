import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { EditorService } from '../editor.service';
import { DocumentsService } from '../documents.service';
import docsModel from '../../models/docs';
import { Document } from '../interfaces/document';
import { Documents } from '../interfaces/documents';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";
  documents = this.editorService.documents;
  
  constructor(
    private editorService: EditorService,
    private documentService: DocumentsService,
    private http: HttpClient,
    ) {  }
    
    changedEditor(event: EditorChangeContent | EditorChangeSelection) {
      this.editorService.updateContent(event["editor"]["root"]["innerHTML"]);
    }

    getDocuments() {
      // this.documents = this.http.get(this.documentsUrl).subscribe((result:any)=>{this.documents = result["data"]})
      this.editorService.printDocuments();
    }

    seeDocs() {
      console.log(this.documents);
    }
    

  ngOnInit(): void {
    this.editorService.getDocuments()
  }


}
