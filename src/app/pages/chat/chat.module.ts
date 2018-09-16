import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { MessagesComponent } from './messages/messages.component';
import { ChatRoutingModule, routedComponents } from './chat-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ChatRoutingModule
  ],
  declarations: [
    MessagesComponent,
    ...routedComponents,
  ]
})
export class ChatModule { }
