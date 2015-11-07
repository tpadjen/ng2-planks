import {Injectable} from 'angular2/angular2';

import {PlankRecord} from '../models/plank-record/plank-record';
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

  public usersUrl           = this.BASE_URL + 'users';
  public plankRecordsUrl    = this.BASE_URL + 'plank-records';
  public plankObjectivesUrl = this.BASE_URL + 'plank-objectives';
  public groupsUrl          = this.BASEURL + 'groups';
  public authUrl            = this.usersUrl;


  public plankRecords    = new FirebaseWrapper(this.plankRecordsUrl, PlankRecord);
  public plankObjectives = new Firebase(this.plankObjectivesUrl);
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
    if (this.plankRecords) {
      this.plankRecords.off();
    }
    if (this.plankObjectives) {
      this.plankObjectives.off();
    }
    if (this.users) {
      this.users.off();
    }
    if (this.groups) {
      this.groups.off();
    }
  }

}