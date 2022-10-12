import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
  ) {}
  token = <string>localStorage.getItem("token");
  user = <string>localStorage.getItem("user");
  
  /**
   * Log out user and clear local storage
   */
  logout(): void {
    localStorage.clear();
    this.user = ""
    this.token = ""
    this.router.navigate(["login"])
  }
}
