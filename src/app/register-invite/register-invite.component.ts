import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-invite',
  templateUrl: './register-invite.component.html',
  styleUrls: ['./register-invite.component.scss']
})
export class RegisterInviteComponent implements OnInit {
  private email?: string
  private password?: string
  // public url = "http://localhost:1337/auth/register"
  public url = "https://jsramverk-editor-jofr21.azurewebsites.net/auth/register";
  public inviteUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/invite";
  public documentsUrl = "https://jsramverk-editor-jofr21.azurewebsites.net/docs";
  public inviteObject?: any;

  public flash?: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  /**
   * Register user
   */
  register() {
    this.http.post(this.url,{ email: this.inviteObject.data.invite.email, password: this.password})
    .subscribe({
      next: (data:any) => {
        data = data.data
        if (data.message == 'User successfully created') {
          localStorage.setItem("user", data.email);
          localStorage.setItem("token", data.token);
          this.authService.setToken(data.token);
          this.addToDocument();
          this.removeInvite();
          // this.router.navigate(["editor-page"])
          // .then(() => {
          //   window.location.reload();
          // });
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

  /**
   * Get invite object
   */
   getInvite(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.http.get(this.inviteUrl+"/"+id)
    .subscribe({
      next: (data) => {
        this.inviteObject = data;
        console.log(this.inviteObject.data.invite.email)
      }
    })
  }

  /**
   * Add the user to the document
   */
    addToDocument(): void {
      const token = localStorage.getItem("token");
      const newUser = this.inviteObject.data.invite.email;
      const docID = this.inviteObject.data.invite.document;
      console.log(token, newUser, docID);

      if (token) {
        console.log("token exists");
        
        this.http.put((this.documentsUrl+"/invite"),
        {_id: docID, newUser: newUser},
        {headers: {"x-access-token": token}})
        .subscribe({
          next: (data:any) => {
            console.log(data);
            console.log("User added to document")
          }, error: (error) => {
            console.log("error: ", error)
          }
        })
      }
    }

  /**
   * Remove invite object
   */
  removeInvite(): void {
    const id = this.inviteObject.data.invite._id;

    this.http.delete(this.inviteUrl, {body:{id: id}}).
    subscribe({
      next: (data:any) => {
            console.log(data);
            console.log("Invite removed")
            this.router.navigate(["editor-page"])
          .then(() => {
            window.location.reload();
          });
      }
    })
  }

  ngOnInit(): void {
    this.getInvite();
  }

}
