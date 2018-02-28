import {Component, Input, OnInit, OnDestroy, AfterViewChecked} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cat} from '../../model/cat';
import {CatService} from '../../service/model-service/cat.service';
import {Miaou} from '../../model/miaou';
import {MiaouService} from '../../service/model-service/miaou.service';
import {forEach} from '@angular/router/src/utils/collection';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../service/authentification.service';

@Component({
  moduleId: module.id,
  selector: 'meow',
  templateUrl: './meow.component.html',
  styleUrls: ['./meow.component.css']
})

export class MeowComponent implements OnInit {
  cats: Cat[];
  catsNotMeow: Cat[];
  miaous: Miaou[];
  catMeow: Cat;
  catChoose: Cat;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private miaouService: MiaouService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private catService: CatService) {
    catService.getCats().subscribe(cats => {
        this.cats = cats;
        for (let cat of this.cats) {
          if (cat.idUser !== +localStorage.getItem('currentUser')) {
            this.cats = this.cats.filter(c => c !== cat);
          }
        }
      }
    );
  }

  ngOnInit() {

  }

  getCats(): void {

  }

  getCatsNoMeow(cat: Cat): void {
    this.catChoose = cat;
    this.catService.getCats()
      .subscribe(catsNotMeow => {
          this.catsNotMeow = catsNotMeow;
          for (let catOwn of this.catsNotMeow) {
            if (catOwn.idUser === +localStorage.getItem('currentUser')) {
              this.catsNotMeow = this.catsNotMeow.filter(c => c !== catOwn);
            }
          }
        }
      );
    this.miaouService.getMiaous()
      .subscribe(miaous => this.miaous = miaous);
    this.catMeow = this.catsNotMeow[Math.floor(Math.random() * this.catsNotMeow.length) + 0];
  }

  yes(catY: Cat): void {
    this.getCatsNoMeow(this.catChoose);
  }

  no(catN: Cat): void {
    this.getCatsNoMeow(this.catChoose);
  }

  delete(cat: Cat): void {
    this.cats = this.cats.filter(c => c !== cat);
    this.catService.deleteCat(cat).subscribe();
  }

  logout() {
    // reset login status
    this.authenticationService.logout();
    let route = ['/home'];
    this.router.navigate(route);
  }
}
