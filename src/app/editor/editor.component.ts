import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { EditorService } from '../editor.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorService.updateContent(event["editor"]["root"]["innerHTML"]);
    
  }

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
  }

}
