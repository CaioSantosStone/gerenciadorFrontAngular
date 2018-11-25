import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class/class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRegisterComponent } from './class-register/class-register.component';
import { routedComponents, ClassRoutingModule } from './class-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ClassRoutingModule,
  ],
  declarations: [
    ClassComponent, 
    ClassListComponent, 
    ClassRegisterComponent,
    ...routedComponents
  ]
})
export class ClassModule { }