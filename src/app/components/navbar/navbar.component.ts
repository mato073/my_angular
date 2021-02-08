import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  GoPosts () {
    this.router.navigate(['Category']);
  }

  GoLogin () {
    var user = firebase.auth().currentUser;
    if (user) {
      this.router.navigate(['Admin-page']);
    } else {
    this.router.navigate(['Login-admin']);
    }
  }

  GoHome () {
    this.router.navigate(['Landing']);
  }

  GoBlogs() {
    this.router.navigate(['Blogs']);
  }

}
