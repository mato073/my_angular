import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs'

import { Blog } from "../../models/blog.model";
import { BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  blogs?: Blog[];
  BlogSubscription?: Subscription;

  constructor(private router: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.BlogSubscription = this.blogService.blogsSubject.subscribe(
      (blogs: Blog[]) => {
        this.blogs = blogs;
      }
    );
    this.blogService.getBlogs();
  }

  newPost() {
    this.router.navigate(['new-post']);
  }

  delete (blog: Blog) {
    this.blogService.removeBlog(blog);
  }

}
