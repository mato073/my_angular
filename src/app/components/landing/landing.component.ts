import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Blog } from "../../models/blog.model";
import { BlogService} from "../../services/blog.service";

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  blogs?: Blog[];
  BlogSubscription?: Subscription;
  blogsSize?: number;
  index: number = 0;
  latestBlogs?: Blog[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

    ngOnInit(): void {
      this.BlogSubscription = this.blogService.blogsSubject.subscribe(
        (blogs: Blog[]) => {
          this.blogs = blogs;
        }
      );
      this.blogService.getBlogs();
    }

    goPost(id: number) {
      this.router.navigate(['Post', id]);
    }
}
