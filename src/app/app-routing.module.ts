import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {path: "", redirectTo: "/register", pathMatch: "full"},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "editor-page", component: EditorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes, {useHash: true})]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
