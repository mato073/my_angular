import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
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
    firebase.database().ref('/blogs').set(this.blogs);
  }

  getBlogs() {
    firebase.database().ref('/blogs')
      .on('value', (data) => {
          this.blogs = data.val() ? data.val() : [];
          this.emitBlogs();
        }
      );
  }

  getSingleBlog(id: number) {
    return new Promise (
      (resolve, reject) => {
        firebase.database().ref('/blogs/' + id).once('value').then(
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

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        )
      }
    )
  }
}
