import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {
  path: '',
  component: LoginComponent,
  children: [{
    path: 'sign-in',
    component: SignInComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
