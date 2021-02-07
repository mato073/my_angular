import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { Subject } from 'rxjs'
import { Contact } from '../models/contact.model'

@Injectable()
export class ContactService {

  contacts: Contact[] = [];
  contactsSubject = new Subject<Contact[]>();

  emitContacts() {
    this.contactsSubject.next(this.contacts);
  }

  saveContacts() {
    firebase.database().ref('/contacts').set(this.contacts);
  }

  getContacts() {
    firebase.database().ref('/contacts')
      .on('value', (data) => {
          this.contacts = data.val() ? data.val() : [];
          this.emitContacts();
        }
      );
  }

  getSingleContact(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/contacts/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewContact(newContact: Contact) {
    this.contacts.push(newContact);
    this.saveContacts();
    this.emitContacts();
  }

  removeContact(contact: Contact) {
    const contactIndexToRemove = this.contacts.findIndex(
      (contactEl) => {
        if(contactEl === contact)
          return true;
        else
          return false;
      }
    );
    this.contacts.splice(contactIndexToRemove, 1);
    this.saveContacts();
    this.emitContacts();
  }
}
