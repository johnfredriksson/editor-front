import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { HeaderComponent } from './header/header.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const config: SocketIoConfig = { url: "https://jsramverk-editor-jofr21.azurewebsites.net", options: {} };

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        EditorComponent,
      ],
      imports: [ HttpClientTestingModule, SocketIoModule.forRoot(config) ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Quill Editor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Quill Editor');
  });
});
