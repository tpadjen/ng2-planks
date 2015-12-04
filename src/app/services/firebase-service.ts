import {Injectable} from 'angular2/angular2';

import {TimedRecord} from '../models/timed-record/timed-record';
import {Group} from '../models/group/group';

export class FirebaseWrapper extends Firebase {

  constructor(url: string, private typeClass: any) {
    super(url);
  }

  change(eventType: string, callback): void {
    this.on(eventType, snapshot => {
      callback(this.typeClass.convertSnapshot(snapshot.val()));
    });
  };

  get(eventType: string, callback): void {
    this.once(eventType, snapshot => {
      callback(this.typeClass.convertSnapshot(snapshot.val()));
    });
  }
}


@Injectable()
export class FirebaseService {
  public BASE_URL = 'https://planks.firebaseio.com/';

  public usersUrl        = this.BASE_URL + 'users';
  public recordsUrl      = this.BASE_URL + 'records';
  public objectivesUrl   = this.BASE_URL + 'objectives';
  public groupsUrl       = this.BASE_URL + 'groups';
  public authUrl         = this.usersUrl;


  public records         = new FirebaseWrapper(this.recordsUrl, TimedRecord);
  public objectives      = new Firebase(this.objectivesUrl);
  public users           = new Firebase(this.usersUrl);
  public groups          = new FirebaseWrapper(this.groupsUrl, Group);
  public authRef         = this.users;

  onAuth(callback) {
    this.authRef.onAuth(callback);
  }

  authWithOAuthPopup(eventType, error) {
    this.authRef.authWithOAuthPopup(eventType, error);
  }

  unauth() {
    this.authRef.unauth();
  }

  onDestroy() {
    if (this.records) {
      this.records.off();
    }
    if (this.objectives) {
      this.objectives.off();
    }
    if (this.users) {
      this.users.off();
    }
    if (this.groups) {
      this.groups.off();
    }
  }

}