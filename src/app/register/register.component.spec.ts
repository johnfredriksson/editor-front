import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button for register with correct text', () => {
    const button = fixture.debugElement.nativeElement.querySelector("button");

    expect(button).toBeTruthy();
    expect(button.textContent).toEqual("Join");
  });

  it('should have a link to login with correct text', () => {
    const link = fixture.debugElement.nativeElement.querySelector("a");

    expect(link).toBeTruthy();
    expect(link.textContent).toEqual("Login here.");
  });

  it("should have an email input field", () => {
    const input = fixture.nativeElement.querySelector("#register-email");
    
    expect(input).toBeTruthy();
    expect(input.type).toEqual("email");
  });

  it("should have an password input field", () => {
    const input = fixture.nativeElement.querySelector("#register-password");
    
    expect(input).toBeTruthy();
    expect(input.type).toEqual("password");
  });
});
