import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from "../../service/authentification.service";

@Component({
  moduleId: module.id,
  selector: 'addCat',
  templateUrl: './addCat.component.html',
  styleUrls: ['./addCat.component.css']
})

export class AddCatComponent implements OnInit{

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  logout() {
    // reset login status
    this.authenticationService.logout();
    let route = ['/home'];
    this.router.navigate(route);
  }
}
