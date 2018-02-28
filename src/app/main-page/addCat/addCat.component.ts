import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from "../../service/authentification.service";
import { Cat } from '../../model/cat';
import { CatService } from '../../service/model-service/cat.service';
import {User} from '../../model/user';

@Component({
  moduleId: module.id,
  selector: 'addCat',
  templateUrl: './addCat.component.html',
  styleUrls: ['./addCat.component.css']
})

export class AddCatComponent implements OnInit{
cat: Cat;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private catService : CatService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.cat = new Cat();
  }

  onSubmit() {
    this.cat.idUser = +localStorage.getItem('currentUser');
    this.catService.addCat(this.cat).subscribe(cat => this.cat = cat);
  }

  logout() {
    // reset login status
    this.authenticationService.logout();
    let route = ['/home'];
    this.router.navigate(route);
  }
}
