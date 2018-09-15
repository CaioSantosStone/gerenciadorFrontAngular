import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConteudoRoutingModule, routedComponents } from './conteudo-routing.module';
import { ConteudoComponent } from './conteudo/conteudo.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ConteudoRoutingModule
  ],
  declarations: [
    ListagemComponent,
    CadastroComponent,
    ...routedComponents,
    ConteudoComponent,
  ]
})
export class ConteudoModule { }
