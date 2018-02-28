import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-page/home-page.component'
import { LoginComponent } from './main-page/login/login.component'
import { SignInComponent } from './main-page/signIn/signIn.component'
import { AddCatComponent } from './main-page/addCat/addCat.component'
import { MeowComponent } from './main-page/meow/meow.component'
import {AuthGuard} from "./_guards/auth.guards";
import {AuthNonConnectedGuard} from "./_guards/authNonConnected.guads";


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home'},
  { path: "home", component: HomeComponent, canActivate: [AuthNonConnectedGuard]},
  { path: "login", component: LoginComponent, canActivate: [AuthNonConnectedGuard]},
  { path: "signIn", component: SignInComponent, canActivate: [AuthNonConnectedGuard]},
  { path: "addCat", component: AddCatComponent, canActivate: [AuthGuard]},
  { path: "meow", component: MeowComponent, canActivate: [AuthGuard]},

  { path: "**", redirectTo: 'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routableComponents = [
  HomeComponent,
  LoginComponent,
  SignInComponent,
  AddCatComponent,
  MeowComponent,
]
