import {Injectable} from 'angular2/angular2';
import {Router, Location} from 'angular2/router';

import {User} from '../models/user/user';

import {FirebaseService} from './firebase-service';
import {PlanksService} from './planks-service';

@Injectable()
export class UserService {
  public user: User;
  public objectives;
  public isAuthorizing = true;

  constructor(
    private FirebaseService: FirebaseService,
    private PlanksService: PlanksService,
    private router: Router,
    private location: Location
  ) {
    this.FirebaseService.onAuth((userData) => this.onAuth(userData));
  }

  onAuth(userData) {
    if (userData) {
      this.user = new User(userData, this.FirebaseService);

      this.user.loading.then(() => {
        this.isAuthorizing = false;
        if (this.user.groups != null && this.location.path() == "") {
          if (!this.user.groups || this.user.groups.length == 0) {
            this.router.navigate(['/Join']);
          } else {
            this.router.navigate(['/Group', {group: this.user.groups[0]}]);
          }
        }
      });
    } else {
      this.user = null;
      this.isAuthorizing = false;
      this.router.navigate(['/Root']);
    }
  }

  signOut() {
    this.FirebaseService.unauth();
  }

  isLoggedIn() {
    return this.doesExist() && this.user.isLoaded();
  }

  doesExist() {
    return this.user != null;
  }

  authWithGoogle() {
    this.isAuthorizing = true;
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

  objectiveFor(date) {
    if (!this.objectives) return 0;

    var clone = new Date(date.getTime()).setHours(0,0,0,0);
    return this.objectives[clone];
  }

  get profile() {
    return this.user ? this.user.profile : null;
  }

  get uid() {
    return this.user ? this.user.uid : null;
  }

  get id():string {
    return this.uid ? this.uid.replace("google:", "") : null;
  }

  get groups() {
    return this.user ? this.user.groups : null;
  }

  get plankRecords() {
    return this.user ? this.user.plankRecords : null;
  }

  get daysPlanked() {
    return this.user.daysPlanked;
  }

  get timePlanked(): number {
    if (!this.plankRecords) return 0;

    return Object.keys(this.plankRecords).map(datetime => {
      return this.PlanksService.objectiveFor(new Date(parseInt(datetime)));
    }).reduce((a, b) => { return a + b; });
  }

  loadingPlankRecords() {
    return this.user.loadingPlankRecords;
  }

  plankedOn(datetime) {
    return this.plankRecords && this.plankRecords[datetime];
  }

  attemptToJoinGroup(group, password) {
    return new Promise((resolve, reject) => {
      this.FirebaseService
      .groups
      .child(group)
      .child('users')
      .child(this.uid)
      .set({password: password}, (error) => {
        if (error) { // not authorized
          reject(error);
        } else { // successfully joined group
          resolve(this._addToGroup(group));
        }
      });
    });
  }

  _addToGroup(group): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService
        .users
        .child(this.uid)
        .child('groups')
        .child(group)
        .set(true, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });

  }

  // setObjectives(objectives) {
  //   return new Promise((resolve, reject) => {
  //     this.FirebaseService.plankObjectives.set(objectives, error => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(null);
  //       }
  //     });
  //   });
  // }

}