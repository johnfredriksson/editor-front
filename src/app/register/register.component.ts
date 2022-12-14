import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private email?: string
  private password?: string
  public url = "https://jsramverk-editor-jofr21.azurewebsites.net/auth/register";
  public inviteUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/invite";

  public flash?: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  /**
   * Register user
   */
  register() {
    this.http.post(this.url,{ email: this.email, password: this.password})
    .subscribe({
      next: (data:any) => {
        data = data.data
        if (data.message == 'User successfully created') {
          localStorage.setItem("user", data.email);
          localStorage.setItem("token", data.token);
          this.authService.setToken(data.token);
          this.router.navigate(["editor-page"])
          .then(() => {
            window.location.reload();
          });
        }
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
   emailField(event: any): void {
    this.email = event.target.value;
  }

  /**
   * Update the value for password.
   * 
   * @param event the change in input field
   */
   passwordField(event: any): void {
    this.password = event.target.value;
  }
}
