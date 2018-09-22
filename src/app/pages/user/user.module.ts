import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegisterComponent } from './user-register/user-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    UserRoutingModule,
  ],
  declarations: [
    UserRegisterComponent,
    UserListComponent,
    UserComponent,
    ...routedComponents]
})
export class UserModule { }
