import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private invite?: any;
  private token?: any
  constructor(
    ) { }
  setToken(token: any) {
    this.token = token;
  }
  getToken() {
    return this.token
  }

  setInvite(inviteObj: any) {
    this.invite = inviteObj;
  }

  getInvite(): any {
    return this.invite
  }
}
