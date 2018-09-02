/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { LoginModule } from './login/login.module';
import { HttpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './guards/auth.guard'
import { AuthenticationService } from './services/authentication.service'
import { TokenApiService } from './services/tokenApi.service'
import { CredentiationService } from './services/credentiation.service'

import { ToastrModule } from 'ngx-toastr';

//Retira o erro com o Map na utilizacao de Observabol response
import 'rxjs/add/operator/map';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    LoginModule,
    TextMaskModule

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    AuthenticationService,
    TokenApiService,
    CredentiationService
  ],
})
export class AppModule {
}
