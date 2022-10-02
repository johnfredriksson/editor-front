import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  token = localStorage.getItem("token");
  user = localStorage.getItem("user");
  ngOnInit(): void {
  }

  /**
   * Log out user and clear local storage
   */
  logout() {
    localStorage.clear();
    this.router.navigate(["login"])
    .then(() => {
      window.location.reload();
    });
  }

  tester() {
    console.log(localStorage)
    console.log(this.token)
  }

}
