import {Injectable} from 'angular2/angular2';
import {Router, Location} from 'angular2/router';

import {User} from '../models/user/user';

import {FirebaseService} from './firebase-service';

@Injectable()
export class UserService {
  public user: User;

  constructor(
    private FirebaseService: FirebaseService,
    private router: Router,
    private location: Location
  ) {
    this.FirebaseService.onAuth((user) => {
      if (user) {
        this.user = new User(user);
        this.FirebaseService.users.child(user.uid).update({name: this.user.profile.name}, error => {
          if (error) console.log(error);
        });
        this.FirebaseService.plankRecords.child(user.uid).on('value', snapshot => {
          this.user.plankRecords = snapshot.val();
        });
        if (this.location.path() == "") {
          this.router.navigate(['/Home']);
        }
      } else {
        this.user = null;
        this.router.navigate(['/Root']);
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

  setPlankRecord(datetime) {
    this.FirebaseService.plankRecords
      .child(this.uid)
      .child(datetime+"")
      .set(true);
  }

  removePlankRecord(datetime) {
    this.FirebaseService.plankRecords
      .child(this.uid)
      .child(datetime+"")
      .remove();
  }

  get profile() {
    return this.user ? this.user.profile : null;
  }

  get uid() {
    return this.user ? this.user.uid : null;
  }

  get plankRecords() {
    return this.user ? this.user.plankRecords : null;
  }

  plankedOn(datetime) {
    return this.plankRecords && this.plankRecords[parseInt(datetime)];
  }

}