import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { InviteComponent } from './invite.component';

describe('InviteComponent', () => {
  let component: InviteComponent;
  let fixture: ComponentFixture<InviteComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  let store:any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    const mockInviteParams = {
      getInvite: ():any => {
        const inviteParams = {
          email: "email",
          document: "document"
        }
        return inviteParams
      }
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ InviteComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockInviteParams },
      ]
    })
    .compileComponents();

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    fixture = TestBed.createComponent(InviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a h1 title", () => {
    const h1 = fixture.debugElement.nativeElement.querySelector("h1");

    expect(h1).toBeTruthy();
  });

  it("should have a button with correct text", () => {
    const button = fixture.debugElement.nativeElement.querySelector("button");

    expect(button).toBeTruthy();
    expect(button.textContent).toEqual("Invite");
  });

  it("should make http post request when invite() is called", () => {
    mockLocalStorage.setItem("token", "test");
    component.invite();

    expect(mockRouter.navigate).toHaveBeenCalledWith(["editor-page"]);
  })

  it("should redirect to editor-page when invite() is called", () => {
    component.invite();

    expect(mockRouter.navigate).toHaveBeenCalledWith(["editor-page"]);
  })
});
