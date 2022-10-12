import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {

  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService
  ) { }

  /**
   * Send invite
   */
  invite(): void {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const inviteParams = this.authService.getInvite();
      this.http.post("https://jsramverk-editor-jofr21.azurewebsites.net/invite", {email: inviteParams.newUser, document: inviteParams.id})
      .subscribe({
      })

    }
    this.router.navigate(["editor-page"]);
  }
}
