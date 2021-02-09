import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs'

import { Blog } from "../../models/blog.model";
import { BlogService } from "../../services/blog.service";
import { CategorieService } from "../../services/categorie.service"

import {Contact} from '../../models/contact.model'
import {ContactService} from '../../services/contact.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  blogs?: Blog[];
  BlogSubscription?: Subscription;

  contacts?: Contact[];
  ContactsSubscription?: Subscription;

  constructor(private router: Router,
    private blogService: BlogService,
    private categorieService: CategorieService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.BlogSubscription = this.blogService.blogsSubject.subscribe(
      (blogs: Blog[]) => {
        this.blogs = blogs;
      }
    );
    this.blogService.getBlogs();
    this.ContactsSubscription = this.contactService.contactsSubject.subscribe( 
      (data: Contact[]) => {
        this.contacts = data;
      }
    )
    this.contactService.getContacts();
  }

  newPost() {
    this.router.navigate(['new-post']);
  }

  delete (blog: Blog) {
    
    var r = confirm("Are you sure you want to delete this blog ?");
    if (r == true) {
      this.blogService.removeBlog(blog);
    }
  }

  deleteC(contact: Contact) {
    this.contactService.removeContact(contact);
  }

}
