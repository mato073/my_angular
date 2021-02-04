import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule, Routes, } from "@angular/router";

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { LegalComponent } from './components/legal/legal.component';
import { BlogpostsComponent } from './components/blogposts/blogposts.component';
import { PostComponent } from './components/post/post.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider'
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes: Routes = [
  {path: 'Landing', component: LandingComponent},
  {path: 'About', component: AboutUsComponent},
  {path: 'Contact', component: ContactComponent},
  {path: 'Legal', component: LegalComponent},
  {path: 'Posts', component: BlogpostsComponent},
  {path: 'Admin-page', component: AdminComponent},
  {path: 'Login-admin', component: LoginAdminComponent },
  {path: '', redirectTo: 'Landing', pathMatch: 'full'},
  {path: '**', redirectTo: 'Landing'}
]

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent,
    LegalComponent,
    BlogpostsComponent,
    PostComponent,
    AdminComponent,
    LoginAdminComponent,
    LandingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
