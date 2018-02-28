import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) {}

  ngOnInit() {
  }
}
