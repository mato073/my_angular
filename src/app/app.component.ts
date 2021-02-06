import { Component } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/analytics'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular';
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAAoJDkqz7gZHg2cJPtrSm3F-KdS8KFhWQ",
      authDomain: "myangular-f390f.firebaseapp.com",
      databaseURL: "https://myangular-f390f-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "myangular-f390f",
      storageBucket: "myangular-f390f.appspot.com",
      messagingSenderId: "337094424837",
      appId: "1:337094424837:web:59a58b1787b04fadc11f6c",
      measurementId: "G-GKCDQTTDQS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
