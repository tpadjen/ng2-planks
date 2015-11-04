import {Injectable} from 'angular2/angular2';
import {Router, Location} from 'angular2/router';

import {User} from '../models/user/user';

import {FirebaseService} from './firebase-service';
import {PlanksService} from './planks-service';

@Injectable()
export class UserService {
  public user: User;
  public objectives;

  constructor(
    private FirebaseService: FirebaseService,
    private PlanksService: PlanksService,
    private router: Router,
    private location: Location
  ) {
    this.FirebaseService.onAuth((userData) => {
      if (userData) {
        this.user = new User(userData, FirebaseService);

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
    return this.plankRecords && this.plankRecords[parseInt(datetime)];
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