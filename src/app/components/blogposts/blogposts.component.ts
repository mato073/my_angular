import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Blog } from "../../models/blog.model";
import { BlogService} from "../../services/blog.service";

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {

  blogs?: Blog[];
  BlogSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private blogService: BlogService) { }

  ngOnInit(): void {
    this.BlogSubscription = this.blogService.blogsSubject.subscribe(
      (blogs: Blog[]) => {
        this.blogs = blogs;
      }
    );
    this.blogService.emitBlogs();
  }

  createBlog() {
    const newBlog = new Blog("ok", "fe", "fe");
    this.blogService.createNewBlog(newBlog);
  }

}
