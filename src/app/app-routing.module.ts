import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { InviteComponent } from './invite/invite.component';
import { RegisterInviteComponent } from './register-invite/register-invite.component';

const routes: Routes = [
  {path: "", redirectTo: "/register", pathMatch: "full"},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "editor-page", component: EditorComponent},
  {path: "invite", component: InviteComponent},
  {path: "register-invite/:id", component: RegisterInviteComponent},
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes, {useHash: true})],
    // [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
