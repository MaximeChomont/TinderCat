import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomeComponent implements OnInit{



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
