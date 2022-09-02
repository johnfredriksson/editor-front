import { Component, OnInit } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faFloppyDisk = faFloppyDisk;

  constructor(private editorService: EditorService) { }

  save(): void {
    this.editorService.getContent();
  }

  ngOnInit(): void {
  }

}
