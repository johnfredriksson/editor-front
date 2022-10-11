import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Send invite
   */
  invite(): void {
    let authToken = localStorage.getItem("token");
    if (authToken) {
      let token;
      const inviteParams = this.authService.getInvite();

      this.http.post("https://jsramverk-editor-jofr21.azurewebsites.net/invite", {email: inviteParams.newUser, document: inviteParams.id})
      .subscribe({
        next: (data:any) => {
          const inviteObject = data;
          console.log(inviteObject);
        }
      })

    }
    

    this.router.navigate(["editor-page"]);
  }

  ngOnInit(): void {
  }

}
