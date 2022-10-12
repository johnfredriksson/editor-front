import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button for login with correct text', () => {
    const button = fixture.debugElement.nativeElement.querySelector("button");

    expect(button).toBeTruthy();
    expect(button.textContent).toEqual("Login");
  });

  it('should have a link to registration with correct text', () => {
    const link = fixture.debugElement.nativeElement.querySelector("a");

    expect(link).toBeTruthy();
    expect(link.textContent).toEqual("Register here.");
  });

  it("should have an email input field", () => {
    const input = fixture.nativeElement.querySelector("#login-email");
    
    expect(input).toBeTruthy();
    expect(input.type).toEqual("email");
  });

  it("should have an password input field", () => {
    const input = fixture.nativeElement.querySelector("#login-password");
    
    expect(input).toBeTruthy();
    expect(input.type).toEqual("password");
  });
});
