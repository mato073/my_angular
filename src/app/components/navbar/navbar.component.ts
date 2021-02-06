import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as firebase from 'firebase'

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
    this.router.navigate(['Posts']);
  }

  GoLogin () {
    var user = firebase.default.auth().currentUser;
    if (user) {
      this.router.navigate(['Admin-page']);
    } else {
    this.router.navigate(['Login-admin']);
    }
  }

  GoHome () {
    this.router.navigate(['Landing']);
  }

}
