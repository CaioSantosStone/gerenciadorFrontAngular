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
      path: 'get-alunos',
      loadChildren: './get-alunos/get-alunos.module#getAlunosModule',
    },
    {
      path: 'conteudo',
      loadChildren: './conteudo/conteudo.module#ConteudoModule',
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
