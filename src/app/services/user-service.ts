import {Injectable} from 'angular2/angular2';

import {User} from '../models/user/user';

import {FirebaseService} from './firebase-service';

@Injectable()
export class UserService {
  public user: User;

  constructor(private FirebaseService: FirebaseService) {
    this.FirebaseService.onAuth((user) => {
      if (user) {
        this.user = new User(user);
        this.FirebaseService.users.child(user.uid).update({name: this.user.profile.name}, error => {
          console.log("Error saving user");
        } )
      } else {
        this.user = null;
      }
    })
  }

  signOut() {
    this.FirebaseService.unauth();
  }

  isLoggedIn() {
    return this.user != null;
  }

  authWithGoogle() {
    this.FirebaseService.authWithOAuthPopup("google", (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  get profile() {
    return this.user ? this.user.profile : null;
  }

  get uid() {
    return this.user ? this.user.uid : null;
  }

}