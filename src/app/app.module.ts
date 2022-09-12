import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    QuillModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
