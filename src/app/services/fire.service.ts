import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  private usersCollection: AngularFirestoreCollection<any>;
  user: any[] = [];
  constructor(public afs: AngularFirestore, public router: Router) { }

  goTo(url) {
    this.router.navigateByUrl(url);
  }

  // user stuff
  getUserProfile(id) {
    this.usersCollection = this.afs.collection<any>(`users/${id}`);
    return this.usersCollection.snapshotChanges().pipe(map((user: any) => {
      this.user = [];

      for (const users of user) {
        this.user.unshift(users);
      }

      return this.user;
    }));
  }


  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users').add({
        uid: value.uid,
        name: value.name,
        phone: value.phone,
        email: value.email,
        img: value.img,
        address: value.address,
        date: Date.now(),
        username: value.username,
      });
      this.router.navigateByUrl(`profile`);
    });
  }

  
  updateUser(value, id?) {
    return this.afs.collection('users').doc(value.uid).collection('profile').doc(id).set(value);
   }
}
