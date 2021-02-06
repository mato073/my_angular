import { Component, OnInit } from '@angular/core';
import { Blog } from "../../models/blog.model";

import { Router, ActivatedRoute } from "@angular/router";
import { BlogService} from '../../services/blog.service'

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post?: any;
  CardSubscription?: Subscription;

  constructor(private blogService: BlogService,
    private route:  ActivatedRoute,) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.blogService.getSingleBlog(+id).then(
      (post: any) => {
        this.post = post;
        console.log('post =', this.post);
        
      }
    )
  }
}
