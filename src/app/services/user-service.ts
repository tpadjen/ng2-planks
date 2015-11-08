import {Injectable} from 'angular2/angular2';
import {Router, Location} from 'angular2/router';

import {PlankRecord} from '../models/plank-record/plank-record';

import {FirebaseService} from './firebase-service';
import {PlanksService} from './planks-service';

@Injectable()
export class UserService {
  private authData;
  public objectives;
  public groups = {};
  public plankRecords: PlankRecord[];
  public isAuthorizing = true;
  private _isLoaded = false;
  public _loadPromise: Promise<any> = Promise.resolve(null);

  public firebaseUrl = 'https://planks.firebaseio.com/users';
  public userRef;

  constructor(
    private FirebaseService: FirebaseService,
    private PlanksService: PlanksService,
    private router: Router,
    private location: Location
  ) {
    this.FirebaseService.onAuth((userData) => this.onAuth(userData));
  }


  /**
   * Auth
   */

  onAuth(userData) {
    if (userData) {
      this.authData = userData;
      this.isAuthorizing = false;

      this.PlanksService.loadObjectives();
      let loaders = [
        this._loadGroups(),
        this._loadPlankRecords(),
        this._persistUser(),
        this.PlanksService.waitForLoad()
      ];
      this._loadPromise = Promise.all(loaders).then(() => { this.onLoad(); });
    } else {
      this.authData = null;
      this._isLoaded = null
      this.groups = {};
      this.isAuthorizing = false;
      this.router.navigate(['/Root']);
    }
  }

  authWithGoogle() {
    this.isAuthorizing = true;
    this.FirebaseService.authWithOAuthPopup("google", (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  signOut() {
    this.FirebaseService.unauth();
  }

  isLoggedIn() {
    return this.isLoaded();
  }

  doesExist() {
    return this.authData != null;
  }


  /**
   * Loading
   */

  isLoaded() {
    return this._isLoaded;
  }

  onLoad() {
    this._isLoaded = true;

    if (this.location.path() == "") {
      this.router.navigate(['/Member', {id: this.id}]);
    }

    return Promise.resolve(null);
  }

  waitForLoad() {
    return this._loadPromise;
  }


  /**
   * User Model
   */

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
    return this.doesExist() ? this.authData.google.cachedUserProfile : null;
  }

  get name(): string {
    return this.doesExist() ? this.profile.name : null;
  }

  get uid(): string {
    return this.doesExist() ? this.authData.uid : null;
  }

  get id():string {
    return this.uid ? this.uid.replace("google:", "") : null;
  }

  get daysPlanked() {
    if (!this.plankRecords) return 0;
    return Object.keys(this.plankRecords).length;
  }

  get timePlanked(): number {
    if (!this.plankRecords) return 0;

    return Object.keys(this.plankRecords).map(datetime => {
      return this.PlanksService.objectiveFor(new Date(parseInt(datetime)));
    }).reduce((a, b) => { return a + b; });
  }

  plankedOn(datetime) {
    return this.plankRecords && this.plankRecords[datetime];
  }

  joinGroup(group, password) {
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

  isMemberOfGroup(group) {
    return this.groups && group in this.groups;
  }

  hasLoadedGroup(group) {
    return this.groups[group].length > 0;
  }

  groupMembers(group: string) {
    return this.groups[group];
  }

  setGroupMembers(group, members: Array<any>) {
    this.groups[group] = members;
  }

  get groupNames() {
    return (Object.keys(this.groups) || []);
  }

  hasGroups() {
    return this.groupNames.length > 0;
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
            this.groups[group] = [];
            resolve();
          }
        });
    });

  }


  /**
   * Loading
   */

  _loadPlankRecords(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService.plankRecords.child(this.uid)
        .on('value', snapshot => {
          this.plankRecords = snapshot.val();
          // this.loadingPlankRecords = false;
          resolve();
      });
    });
  }

  _loadGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService.users.child(this.uid).child('groups')
        .once('value',(groups) => {
          let val = groups.val();
          if (val) {
            this.groups = {};
            Object.keys(val).forEach(key => {
              this.groups[key] = [];
            });
          }
          resolve();
      });
    });
  }

  _persistUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService.users.child(this.uid)
        .update({name: this.profile.name}, error => {
          if (error) console.log(error);
      });
      resolve();
    });
  }

}