// MODULES
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './invite/invite.component';
import { RegisterComponent } from './register/register.component';
import { RegisterInviteComponent } from './register-invite/register-invite.component';

const config: SocketIoConfig = { url: "https://jsramverk-editor-jofr21.azurewebsites.net", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    InviteComponent,
    RegisterInviteComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    CodeEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
