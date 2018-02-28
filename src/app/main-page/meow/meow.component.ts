import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from '../../model/cat';
import { CatService } from '../../service/model-service/cat.service';
import { Miaou } from '../../model/miaou';
import { MiaouService } from '../../service/model-service/miaou.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  moduleId: module.id,
  selector: 'meow',
  templateUrl: './meow.component.html',
  styleUrls: ['./meow.component.css']
})

export class MeowComponent implements OnInit{
  cats: Cat[];
  catsNotMeow: Cat[];
  miaous: Miaou[];

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private catService: CatService,
    private miaouService: MiaouService,
  ) {}

  ngOnInit() {
    this.getCats()
  }

  getCats(): void {
    this.catService.getCats()
      .subscribe(cats => this.cats = cats);
    const idUser = 1;
    this.cats.filter(c => c.idUser !== idUser );
  }

  getCatsNoMeow(): void {
    this.catService.getCats()
      .subscribe(catsNotMeow => this.catsNotMeow = catsNotMeow);
    this.miaouService.getMiaous()
      .subscribe(miaous => this.miaous = miaous);
  }

  delete(cat: Cat): void {
    this.cats = this.cats.filter(c => c !== cat);
    this.catService.deleteCat(cat).subscribe();
  }
}
