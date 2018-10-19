import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { LoginComponent } from './login.component';

import { ThemeModule } from '../@theme/theme.module';
import { SignInModule } from './sign-in/sign-in.module';
import { LoginRoutingModule } from './login-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  imports: [
    NgxEchartsModule,
    ThemeModule,
    LoginRoutingModule,
    SignInModule,

  ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
  ],
})
export class LoginModule { }