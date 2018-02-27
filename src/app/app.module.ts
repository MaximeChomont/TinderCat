import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";


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
import {AlertComponent} from "./_directives/alert.component";
import {AuthGuard} from "./_guards/auth.guards";
import {LoginComponent} from "./main-page/login/login.component";
import {HomeComponent} from "./home-page/home-page.component";
import {SignInComponent} from "./main-page/signIn/signIn.component";
import {AddCatComponent} from "./main-page/addCat/addCat.component";

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    SignInComponent,
    AddCatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    CatService,
    MiaouService,
    AlertService,
    AuthGuard,
    AuthenticationService,
    MessageService,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
