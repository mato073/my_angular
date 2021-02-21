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

  public show :boolean = false;
  public new_com :boolean = false;
  post?: any;
  url?: string
  CardSubscription?: Subscription;
  public buttonName2: any = 'New Comment';
  color?: any

  constructor(private blogService: BlogService,
    private route:  ActivatedRoute,
    private router: Router,
    private previusURLService: PreviusURLService) {
    }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    this.blogService.getSingleBlog(+id).then(
      (post: any) => {
        this.post = post;
      }
    )
  }

  show_new() {
    this.new_com = !this.new_com;

    if(this.new_com) {
      this.buttonName2 = "Cancel";
    } else {
      this.buttonName2 = "New Comment";
    }
  }

  new_comment(body: string) {
    this.new_com = !this.new_com;
    this.buttonName2 = "New Comment";
  }

  goback() {
    if (this.url == '/Landing') {
      this.router.navigate(['Landing']);
    } else if (this.url === '/Blogs') {
      this.router.navigate(['Blogs']);
    } else {
      this.router.navigate([this.url]);
    }
  }
}
