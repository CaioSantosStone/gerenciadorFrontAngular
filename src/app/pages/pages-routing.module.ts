import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from "../guards/auth.guard"


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user',
      loadChildren: './user/user.module#UserModule',
    },
    {
      path: 'content',
      loadChildren: './content/content.module#ContentModule',
    },
    {
      path: 'class',
      loadChildren: './class/class.module#ClassModule',
    },
    {
      path: 'chat',
      loadChildren: './chat/chat.module#ChatModule',
    },
    // {
    //   path: 'conteudo/cadastro',
    //   loadChildren: './conteudo/conteudo.module#ConteudoModule',
    // },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
