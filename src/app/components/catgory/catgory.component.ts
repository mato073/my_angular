import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { CategorieService } from "../../services/categorie.service"
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-catgory',
  templateUrl: './catgory.component.html',
  styleUrls: ['./catgory.component.scss']
})
export class CatgoryComponent implements OnInit {

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

  goToCatogory(cato: string) {
    this.router.navigate(['Posts', cato]);
  }
}
