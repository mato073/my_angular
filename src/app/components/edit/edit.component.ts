import { Component, OnInit } from '@angular/core';

import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { Blog } from '../../models/blog.model'
import { BlogService } from "../../services/blog.service"
import { CategorieService } from "../../services/categorie.service"

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  post?: any;

  PostForm ?: FormGroup;

  errorMessage ?: string;

  constructor(private formBuilder: FormBuilder,
              private blogService: BlogService,
              private router: Router,
              private route:  ActivatedRoute,
              private categorieService: CategorieService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    await this.blogService.getSingleBlog(+id).then(
      (post: any) => {
        this.post = post;
      }
    )
    this.initForm();
  }

  initForm() {
    this.PostForm = this.formBuilder.group({
      title: [this.post.title, [Validators.required, Validators.email]],
      author: [this.post.author, [Validators.required]],
      content: [this.post.content, [Validators.required]],
      category: [this.post.categorie, [Validators.required]],
    })
  }

  async onSubmit(form: NgForm) {
    const title = form.value['title'];
    const author = form.value['author'];
    const content = form.value['content'];
    var category = form.value['category'];

    category = this.categorieService.removeSpaceCategorie(category);
    category = this.categorieService.capitalizeCategorie(category);

    if (this.categorieService.checkIfCategorieExist(category) == false)
    {
        this.categorieService.createNewCategorie(category);
    }

    const newBlog = new Blog(title, author, content, category, this.post.photo);
    this.blogService.editBlog(newBlog, this.route.snapshot.params['id']);
    this.cancel();
  }

  cancel() {
    this.router.navigate(['Admin-page']);
  }
}
