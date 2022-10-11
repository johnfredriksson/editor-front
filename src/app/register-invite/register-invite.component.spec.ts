import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInviteComponent } from './register-invite.component';

describe('RegisterInviteComponent', () => {
  let component: RegisterInviteComponent;
  let fixture: ComponentFixture<RegisterInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
