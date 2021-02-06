import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

import { Blog } from '../../models/blog.model'
import { BlogService} from "../../services/blog.service";

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
              private blogService: BlogService) { }

  ngOnInit(): void {
    this.initForm();
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

    console.log("here");

    const newBlog = new Blog(title, author, content, category, this.fileUrl);
    this.blogService.createNewBlog(newBlog);
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

  cansel() {
    this.router.navigate(['Admin-page']);
  }

}
