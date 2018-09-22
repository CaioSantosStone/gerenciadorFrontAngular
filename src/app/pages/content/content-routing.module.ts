import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componente principal
import { ContentManagerComponent } from './content-manager/content-manager.component';
import { ContentRegisterComponent } from './content-register/content-register.component';
import { ContentComponent } from './content/content.component';

//Componente secundarios dentro do template

const routes: Routes = [{
    path: '',
    component: ContentComponent,
    children: [{
        path: 'manager',
        component: ContentManagerComponent,
    }, {
        path: 'register',
        component: ContentRegisterComponent,
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
export class ContentRoutingModule {

}

export const routedComponents = [
    ContentManagerComponent,
    ContentRegisterComponent,
    ContentComponent
];
