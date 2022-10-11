import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  token = <string>localStorage.getItem("token");
  user = <string>localStorage.getItem("user");
  ngOnInit(): void {
  }

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
