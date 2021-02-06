import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { CategorieService } from "../../services/categorie.service"
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {

  categories?: any;
  CatSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.CatSubscription = this.categorieService.categoriesSubject.subscribe(
      (data: any) => {
        this.categories = data;
        console.log('categ =', this.categories);
        
      }
    );
    this.categorieService.getCategories();
    }

  goPost(id: number) {
    this.router.navigate(['Post', id]);
  }
}
