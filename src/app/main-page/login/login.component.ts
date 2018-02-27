import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user'
import {UserService} from "../../service/model-service/user.service";
import {AlertService} from "../../service/alert.service";
import {AuthenticationService} from "../../service/authentification.service";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'addCat';
  }

  login() {
    this.loading = true;
    if(this.authenticationService.login(this.model.email, this.model.password)) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.alertService.error("Impossible to login");
      this.loading = false;
    }
  }

}