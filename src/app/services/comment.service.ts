import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { Subject } from 'rxjs'
import { Comment } from '../models/comment.model'

@Injectable()
export class CommentService {

  comments: Comment[] = [];
  commentsSubject = new Subject<Comment[]>();

  emitComments() {
    this.commentsSubject.next(this.comments);
  }

  saveComments() {
    firebase.database().ref('/comments').set(this.comments);
  }

  getComments() {
    firebase.database().ref('/comments')
      .on('value', (data) => {
          this.comments = data.val() ? data.val() : [];
          this.emitComments();
        }
      );
  }

  createNewComments(newComment: Comment) {
    this.comments.push(newComment);
    this.saveComments();
    this.emitComments();
  }
}
