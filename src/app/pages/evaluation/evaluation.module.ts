import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterComponent } from './register/register.component';
import { EvaluationRoutingModule, routedComponents } from './evaluation-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    EvaluationRoutingModule
  ],
  declarations: [
    RegisterComponent,
    ...routedComponents,
  ]
})
export class EvaluationModule { }
