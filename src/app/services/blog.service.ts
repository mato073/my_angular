import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Subject } from 'rxjs'
import { Blog } from '../models/blog.model'

@Injectable()
export class BlogService {

  blogs: Blog[] = [];
  blogsSubject = new Subject<Blog[]>();

  emitBlogs() {
    this.blogsSubject.next(this.blogs);
  }

  saveBlogs() {
    firebase.default.database().ref('/blogs').set(this.blogs);
  }

  getBlogs() {
    firebase.default.database().ref('/blogs')
      .on('value', (data) => {
          this.blogs = data.val() ? data.val() : [];
          this.emitBlogs();
        }
      );
  }

  getSingleBlog(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('/blogs/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBlog(newBlog: Blog) {
    this.blogs.push(newBlog);
    this.saveBlogs();
    this.emitBlogs();
  }

  removeBlog(blog: Blog) {
    const blogIndexToRemove = this.blogs.findIndex(
      (blogEl) => {
        if(blogEl === blog)
          return true;
        else
          return false;
      }
    );
    this.blogs.splice(blogIndexToRemove, 1);
    this.saveBlogs();
    this.emitBlogs();
  }
}