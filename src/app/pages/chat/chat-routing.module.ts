import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { MessagesComponent } from './messages/messages.component';


//Componente secundarios dentro do template

const routes: Routes = [{
    path: '',
    component: MessagesComponent,
    children: [{
        path: 'messages',
        component: MessagesComponent,
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
export class ChatRoutingModule {

}

export const routedComponents = [
    MessagesComponent,
];
