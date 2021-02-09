import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Blog } from "../../models/blog.model";
import { BlogService} from "../../services/blog.service";

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  blogs?: Blog[];
  BlogSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.BlogSubscription = this.blogService.blogsSubject.subscribe(
      (blogs: Blog[]) => {
      this.blogs = blogs;
      }
      );
      this.blogService.getBlogs()
  }

  goPost(id: number) {
    var blogsLength = this.blogs!.length;
    blogsLength--;
    this.router.navigate(['Post', blogsLength - id]);
  }

}
