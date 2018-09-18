import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { getAlunosRoutingModule, routedComponents } from './get-alunos-routing.module';
import { TextMaskModule } from 'angular2-text-mask';


import { getAlunosComponent } from './get-alunos.component'
import { OptionGetAlunosComponent } from './option-get-alunos/option-get-alunos.component';
import { OptionCadastroAlunoComponent } from './option-cadastro-aluno/option-cadastro-aluno.component'


@NgModule({
  imports: [
    ThemeModule,
    getAlunosRoutingModule,
    TextMaskModule
  ],
  declarations: [
    getAlunosComponent,
    OptionGetAlunosComponent,
    OptionCadastroAlunoComponent,
    ...routedComponents,
  ],
})
export class getAlunosModule { }
