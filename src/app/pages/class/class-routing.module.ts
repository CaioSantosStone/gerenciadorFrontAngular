import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { ClassComponent } from './class/class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRegisterComponent } from './class-register/class-register.component';

//Componente secundarios dentro do template

const routes: Routes = [{
    path: '',
    component: ClassComponent,
    children: [{
        path: 'list',
        component: ClassListComponent,
    }, {
        path: 'register',
        component: ClassRegisterComponent,
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
export class ClassRoutingModule {

}

export const routedComponents = [
    ClassComponent,
    ClassListComponent,
    ClassRegisterComponent
];
