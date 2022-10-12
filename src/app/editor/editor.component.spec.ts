import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { EditorComponent } from './editor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const config: SocketIoConfig = { url: "https://jsramverk-editor-jofr21.azurewebsites.net", options: {} };


describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [ HttpClientTestingModule, SocketIoModule.forRoot(config) ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    component.documents = {
      data: {
        myDocs: [],
        sharedDocs: []
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show a code editor if its the specified type of a document", () => {
    const mockDoc = {
      _id: "test-id",
      title: "test-title",
      content: "test-content",
      mode: "code",
      comments: []
    };
    component.document = mockDoc;
    fixture.detectChanges();

    const editor = fixture.debugElement.nativeElement.querySelector("#monaco");
    expect(editor).toBeTruthy();
  });

  it("should have run button if mode is code", () => {
    const mockDoc = {
      _id: "test-id",
      title: "test-title",
      content: "test-content",
      mode: "code",
      comments: []
    };
    component.document = mockDoc;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector("#run-button");
    expect(button).toBeTruthy();
  });

  it("should show a quill text editor if its the specified type of a document", () => {
    const mockDoc = {
      _id: "test-id",
      title: "test-title",
      content: "test-content",
      mode: "text",
      comments: []
    };
    component.document = mockDoc;
    fixture.detectChanges();

    const editor = fixture.debugElement.nativeElement.querySelector("#quill");
    expect(editor).toBeTruthy();
  });

  it("should have download button if mode is text", () => {
    const mockDoc = {
      _id: "test-id",
      title: "test-title",
      content: "test-content",
      mode: "text",
      comments: []
    };
    component.document = mockDoc;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector("#download-button");
    expect(button).toBeTruthy();
  });

  it("should display a comment if there is one", () => {
    const mockDoc = {
      _id: "test-id",
      title: "test-title",
      content: "test-content",
      mode: "text",
      comments: [{
        text: "test-comment",
        color: "rgba(255,255,255,1)",
        ranges: "{index:1, length:4}",
        author: "test-author"
      }]
    };
    component.comments = mockDoc.comments;
    component.document = mockDoc;
    fixture.detectChanges();

    const comment = fixture.debugElement.nativeElement.querySelector(".comment");
    expect(comment).toBeTruthy();
    expect(comment.textContent).toEqual("test-author said:test-comment");
  });
});
