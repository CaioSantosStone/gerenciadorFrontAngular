import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { getAlunosComponent } from './get-alunos.component';

//Componente secundarios dentro do template
import { OptionGetAlunosComponent } from './option-get-alunos/option-get-alunos.component';
import { OptionCadastroAlunoComponent } from './option-cadastro-aluno/option-cadastro-aluno.component';

const routes: Routes = [{
  path: '',
  component: getAlunosComponent,
  children: [{
    path: 'option-get-alunos',
    component: OptionGetAlunosComponent,
  }, {
    path: 'option-cadastro-alunos',
    component: OptionCadastroAlunoComponent,
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
export class getAlunosRoutingModule {

}

export const routedComponents = [
  getAlunosComponent,
  OptionGetAlunosComponent,
  OptionCadastroAlunoComponent,
];
