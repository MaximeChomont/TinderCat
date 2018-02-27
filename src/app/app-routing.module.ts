import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-page/home-page.component'
import { LoginComponent } from './main-page/login/login.component'
import { SignInComponent } from './main-page/signIn/signIn.component'


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home'},
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signIn", component: SignInComponent},
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
]
