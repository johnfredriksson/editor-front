import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private email?: string;
  private password?: string;
  public url = "http://localhost:1337/auth/login";
  public flash?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }
  /**
   * Login user
   */
   login() {
    this.http.post(this.url,{ email: this.email, password: this.password})
    .subscribe({
      next: (data:any) => {
        data = data.data
        localStorage.setItem("user", data.email);
        localStorage.setItem("token", data.token);
        this.authService.setToken(data.token);
        this.router.navigate(["editor"])
        .then(() => {
          window.location.reload();
        });
      },
      error: error => {
        this.flash = error.error.errors.message;
      }
    })
  }

  /**
     * Update the value for email field.
     * 
     * @param event the change in input field
     */
   emailField(event: any) {
    this.email = event.target.value;
  }

  /**
     * Update the value for password.
     * 
     * @param event the change in input field
     */
   passwordField(event: any) {
    this.password = event.target.value;
  }
  ngOnInit(): void {
  }

}
