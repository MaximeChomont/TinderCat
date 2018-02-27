import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user'
import {UserService} from "../../service/model-service/user.service";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  @Input() user : User;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUser(1).subscribe(user => this.user = user);
  }

  private goToHome(){
    let route = ['/home'];
    this.router.navigate(route);
  }
}
