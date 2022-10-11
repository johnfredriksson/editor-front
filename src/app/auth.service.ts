import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:1337/auth";
  private invite?: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }
  private token?: any
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
