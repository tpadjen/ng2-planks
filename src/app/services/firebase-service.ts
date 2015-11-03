import {Injectable} from 'angular2/angular2';

import {PlankRecord} from '../models/plank-record/plank-record';
import {User} from '../models/user/user';
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
  public ref: Firebase;
  public url: string;
  public plankRecordsUrl = 'https://planks.firebaseio.com/plank-records';
  public plankObjectivesUrl = 'https://planks.firebaseio.com/plank-objectives';
  public usersUrl = 'https://planks.firebaseio.com/users';
  public groupsUrl = 'https://planks.firebaseio.com/groups';
  public plankRecords: FirebaseWrapper;
  public plankObjectives: Firebase;
  public users: FirebaseWrapper;
  public groups: FirebaseWrapper;

  constructor() {
    this.url = this.usersUrl;
    this.plankRecords = new FirebaseWrapper(this.plankRecordsUrl, PlankRecord);
    this.plankObjectives = new Firebase(this.plankObjectivesUrl);
    this.users = new FirebaseWrapper(this.usersUrl, User);
    this.groups = new FirebaseWrapper(this.groupsUrl, Group);
    this.ref = this.users;
  }

  onAuth(callback) {
    this.ref.onAuth(callback);
  }

  authWithOAuthPopup(eventType, error) {
    this.ref.authWithOAuthPopup(eventType, error);
  }

  unauth() {
    this.ref.unauth();
  }

  onDestroy() {
    if (this.plankRecords) {
      this.plankRecords.off();
    }
    if (this.users) {
      this.users.off();
    }
    if (this.groups) {
      this.groups.off();
    }
  }

}