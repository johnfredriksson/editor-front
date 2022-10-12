import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { RegisterInviteComponent } from './register-invite.component';

describe('RegisterInviteComponent', () => {
  let component: RegisterInviteComponent;
  let fixture: ComponentFixture<RegisterInviteComponent>;
  const inviteObject = {
    data: {
      invite: {
        _id: "test-id",
        email: "test-email",
        document: "test-document"
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInviteComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => {
                  return {id: "test-id"}
                }}}
          }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a prefilled email input field', () => {
    component.inviteObject = inviteObject;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector("#register-invite-email");

    expect(input).toBeTruthy();
    expect(input.value).toEqual("test-email");
    expect(input.type).toEqual("email");
  });

  it('should have a password input field', () => {
    component.inviteObject = inviteObject;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector("#register-invite-password");

    expect(input).toBeTruthy();
    expect(input.type).toEqual("password");
  });
});
