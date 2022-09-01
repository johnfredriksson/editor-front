import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
