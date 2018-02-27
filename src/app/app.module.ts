import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, routableComponents} from "./app-routing.module";
import { UserService} from "./service/model-service/user.service";
import {MessageService} from "./service/model-service/message.service";
import {Configuration} from "./app.constants";
import {MiaouService} from "./service/model-service/miaou.service";
import {CatService} from "./service/model-service/cat.service";
import {AlertService} from "./service/alert.service";
import {AuthenticationService} from "./service/authentification.service";

@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [UserService, CatService, MiaouService, AlertService, AuthenticationService, MessageService, Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
