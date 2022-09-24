import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: "https://jsramverk-editor-jofr21.azurewebsites.net", options: {} };


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
