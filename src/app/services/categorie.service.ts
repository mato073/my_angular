import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { Subject } from 'rxjs'

@Injectable()
export class CategorieService {

  categories: String[] = [];
  categoriesSubject = new Subject<String[]>();

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }

  saveCategories() {
    firebase.database().ref('/categories').set(this.categories);
  }

  getCategories() {
    firebase.database().ref('/categories')
      .on('value', (data) => {
          this.categories = data.val() ? data.val() : [];
          this.emitCategories();
        }
      );
  }

  getSingleCategorie(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categories/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCategorie(newCategorie: String) {
    this.categories.push(newCategorie);
    this.saveCategories();
    this.emitCategories();
  }

  removeSpaceCategorie(categorie: String)
  {
    categorie = categorie.replace(/ +/g, ' ').trim();
    return categorie;
  }

  capitalizeCategorie(categorie: String)
  {
    categorie = categorie.charAt(0).toUpperCase() + categorie.slice(1).toLowerCase();
    return categorie;
  }

  checkIfCategorieExist(categorie: String) {
    const categorieIndexToCheck = this.categories.findIndex(
      (categorieEl) => {
        if (categorieEl === categorie)
          return true;
        else
          return false;
      }
    );
    if (categorieIndexToCheck == -1)
      return false;
    else
      return true;
  }

  removeCategorie(categorie: String) {
    const categorieIndexToRemove = this.categories.findIndex(
      (categorieEl) => {
        if (categorieEl === categorie)
          return true;
        else
          return false;
      }
    );
    this.categories.splice(categorieIndexToRemove, 1);
    this.saveCategories();
    this.emitCategories();
  }
}
