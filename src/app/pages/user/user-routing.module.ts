import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal

//Componente secundarios dentro do template
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'list',
    component: UserListComponent,
  }, {
    path: 'register',
    component: UserRegisterComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UserRoutingModule {

}

export const routedComponents = [
  UserComponent,
  UserListComponent,
  UserRegisterComponent,
];
