import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

import { Blog } from '../../models/blog.model'
import { BlogService} from "../../services/blog.service";
import { CategorieService } from "../../services/categorie.service"

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  fileUrl?: string;

  picture?: any;

  PostForm ?: FormGroup;
  errorMessage ?: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private blogService: BlogService,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.initForm();
    this.blogService.getBlogs();
    this.categorieService.getCategories();
  }

  initForm() {
    this.PostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.email]],
      author: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })
  }

  async onSubmit(form: NgForm) {
    const title = form.value['title'];
    const author = form.value['author'];
    const content = form.value['content'];
    const category = form.value['category'];

    await this.onUploadFile(this.picture);

    const newBlog = new Blog(title, author, content, category, this.fileUrl);
    this.blogService.createNewBlog(newBlog);
    this.categorieService.createNewCategorie(category);
  }

  detectFiles(event: any) {
    this.picture = event.target.files[0];
  }

  async onUploadFile(file: File) {
    await this.blogService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
      }
    );
  }

  cancel() {
    this.router.navigate(['Admin-page']);
  }

}
