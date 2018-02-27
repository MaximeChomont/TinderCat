import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})

export class SignInComponent implements OnInit{

  constructor(
    private route : ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  private goToHome(){
    let route = ['/home'];
    this.router.navigate(route);
  }
}
