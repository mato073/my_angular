import { Component, OnInit } from '@angular/core';
import { Blog } from "../../models/blog.model";

import { Router, ActivatedRoute } from "@angular/router";
import { BlogService} from '../../services/blog.service'
import { PreviusURLService} from '../../services/previus-url.service'

import { Subscription } from 'rxjs'


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post?: any;
  url?: string
  CardSubscription?: Subscription;

  constructor(private blogService: BlogService,
    private route:  ActivatedRoute,
    private router: Router,
    private previusURLService: PreviusURLService) { 
    }

  ngOnInit() {
    this.url = this.previusURLService.getPreviousUrl()
    console.log('url ==', this.url);
    
    const id = this.route.snapshot.params['id'];

    this.blogService.getSingleBlog(+id).then(
      (post: any) => {
        this.post = post;
        console.log('post =', this.post);
        
      }
    )
  }

  goback() {
    if (this.url == '/Landing') {
      this.router.navigate(['Landing']);
    } else if (this.url === '/Blogs') {
      this.router.navigate(['Blogs']);
    }
  }
}
