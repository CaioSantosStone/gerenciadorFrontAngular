import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [{
      path: 'sign-in',
      component: SignInComponent,
    }, {
      path: 'reset-password',
      component: ResetPasswordComponent,
    }, {
      path: 'reset-password-confirm',
      component: ResetPasswordConfirmComponent,
    }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
