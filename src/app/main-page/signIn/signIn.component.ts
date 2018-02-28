import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from "../../service/model-service/user.service";
import {User} from "../../model/user";
import {AlertService} from "../../service/alert.service";

@Component({
  moduleId: module.id,
  selector: 'signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})

export class SignInComponent implements OnInit{

  user: User;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.user = new User();
  }


  onSubmit() {
      this.alertService.error("ajout utilisateur");
      this.userService.addUser(this.user);
  }
}
