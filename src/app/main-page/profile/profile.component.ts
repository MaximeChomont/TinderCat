import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{


  constructor(
    private route : ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }

  private goToHome(){
    let route = ['/home'];
    this.router.navigate(route);
  }
}
