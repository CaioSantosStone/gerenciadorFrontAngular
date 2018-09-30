import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { RegisterComponent } from './register/register.component';


//Componente secundarios dentro do template

const routes: Routes = [{
    path: '',
    component: RegisterComponent,
    children: [{
        path: 'register',
        component: RegisterComponent,
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
export class EvaluationRoutingModule {

}

export const routedComponents = [
    RegisterComponent,
];
