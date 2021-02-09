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
  name?: string

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];

    this.BlogSubscription = this.blogService.blogsSubject.subscribe(
      (blogs: Blog[]) => {
      this.blogs = blogs;
      }
    );
    this.blogService.getBlogs();
  }

  goPost(id: number) {
    var blogsLength = this.blogs!.length;
    blogsLength--;
    this.router.navigate(['Post', blogsLength - id]);
  }

  goback() {
    this.router.navigate(['Category']);
  }
}
