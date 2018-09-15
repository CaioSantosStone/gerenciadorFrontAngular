import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { ConteudoComponent } from './conteudo/conteudo.component';

//Componente secundarios dentro do template

const routes: Routes = [{
    path: '',
    component: ConteudoComponent,
    children: [{
        path: 'listagem',
        component: ListagemComponent,
    }, {
        path: 'cadastro',
        component: CadastroComponent,
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
export class ConteudoRoutingModule {

}

export const routedComponents = [
    CadastroComponent,
    ConteudoComponent,
    ListagemComponent,
];
