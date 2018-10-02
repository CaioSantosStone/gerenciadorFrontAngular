import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegisterComponent } from './register/register.component';
import { EvaluationRoutingModule, routedComponents } from './evaluation-routing.module';
import { FormsModule } from '@angular/forms';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    EvaluationRoutingModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    RegisterComponent,
    ...routedComponents,
    EvaluationListComponent,
  ]
})
export class EvaluationModule { }
