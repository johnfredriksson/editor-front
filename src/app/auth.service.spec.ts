import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should be able to set and get token", () => {
    const token = "token";
    service.setToken(token);
    expect(service.getToken()).toEqual(token);
  });

  it("should be able to set and get invite", () => {
    const invite = {
      email: "email",
      document: "document"
    };
    service.setInvite(invite);
    expect(service.getInvite()).toEqual(invite);
  });
});
