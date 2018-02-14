import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, routableComponents} from "./app-routing.module";
import { UserService} from "./service/model-service/user.service";
import {MessageService} from "./service/model-service/message.service";
import {Configuration} from "./app.constants";

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
  providers: [UserService, MessageService, Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
