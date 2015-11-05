import {FirebaseService} from '../../services/firebase-service';

export class User {
  public plankRecords;
  public loadingPlankRecords: boolean = true;
  public groups: string[];
  public loading: Promise<any>;
  private _isLoaded: boolean = false;

  constructor(
    private authData: any,
    private FirebaseService: FirebaseService
  ) {
    this.loading = Promise.all([
      this._loadGroups(),
      this._loadPlankRecords(),
      this._persistUser()
    ]).then(() => {
      this._isLoaded = true;
    });
  }

  isLoaded() {
    return this._isLoaded;
  }

  get name(): string {
    return this.profile ? this.profile.name : null;
  }

  get profile(): any {
    return this.authData ? this.authData.google.cachedUserProfile : null;
  }

  get uid(): string {
    return this.authData ? this.authData.uid : null;
  }

  get daysPlanked() {
    if (!this.plankRecords) return 0;
    return Object.keys(this.plankRecords).length;
  }

  _loadPlankRecords(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService.plankRecords.child(this.uid)
        .on('value', snapshot => {
          this.plankRecords = snapshot.val();
          this.loadingPlankRecords = false;
          resolve();
      });
    });
  }

  _loadGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService.users.child(this.uid).child('groups')
        .once('value',(groups) => {
          let val = groups.val();
          this.groups = val ? Object.keys(val) : [];
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

  static convertSnapshot(snapshotValue): any[] {
    return Object.keys(snapshotValue);
  }
}