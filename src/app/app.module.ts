import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { RouterModule, Routes, } from "@angular/router";

import { BlogService} from './services/blog.service';
import {AuthService} from './services/auth.service'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { FooterComponent } from './components/footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NewPostComponent } from './components/new-post/new-post.component';

const appRoutes: Routes = [
  {path: 'Landing', component: LandingComponent},
  {path: 'About', component: AboutUsComponent},
  {path: 'Contact', component: ContactComponent},
  {path: 'Legal', component: LegalComponent},
  {path: 'Posts', component: BlogpostsComponent},
  {path: 'Post/:id', component: PostComponent},
  {path: 'Admin-page', component: AdminComponent},
  {path: 'Login-admin', component: LoginAdminComponent },
  {path: 'new-post', component: NewPostComponent },
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
    NavbarComponent,
    FooterComponent,
    NewPostComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [
    BlogService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
