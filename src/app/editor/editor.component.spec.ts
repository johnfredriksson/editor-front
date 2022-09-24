import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { EditorComponent } from './editor.component';

const config: SocketIoConfig = { url: "https://jsramverk-editor-jofr21.azurewebsites.net", options: {} };


describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [ HttpClientTestingModule, SocketIoModule.forRoot(config) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a button called 'create'", () => {
   const editorDe = fixture.debugElement;
   const buttonDe = editorDe.query(By.css("#create"));
   const button = buttonDe.nativeElement;
   expect(button.textContent).toEqual("Create");
  })
});
