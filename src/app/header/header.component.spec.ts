import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a H1 element containing 'Editor'", () => {
    const h1 = fixture.debugElement.nativeElement.querySelector("h1");
    expect(h1.textContent).toBe("Edit(our)");
  });

  it("should change title when a user is logged in", () => {
    component.user = "test";
    fixture.detectChanges();
    const h1 = fixture.debugElement.nativeElement.querySelector("h1");
    expect(h1.textContent).toBe("Edit( test )");
  });

  it("should generate a logout-button if a token is present", () => {
    let button = fixture.nativeElement.querySelector("button");
    expect(button).toBeFalsy();
    
    component.token = "test";
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector("button");
    
    expect(button).toBeTruthy();
    expect(button.textContent).toEqual("Log out");
  });

  it("should clear user and token when logout() is called", () => {
    component.user = "user";
    component.token = "token";

    component.logout();
    fixture.detectChanges();
    
    expect(component.user).toBeFalsy();
  });

  it("should redirect to 'login' when logout() is called", () => {
    component.logout();

    expect(mockRouter.navigate).toHaveBeenCalledWith(["login"]);
  })
});
