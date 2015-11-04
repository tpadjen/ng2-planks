import {FirebaseService} from '../../services/firebase-service';

export class User {
  public plankRecords;
  public loadingPlankRecords: boolean = true;

  constructor(
    private authData: any,
    private FirebaseService: FirebaseService
  ) {
    this._loadPlankRecords();
    this._persistUser();
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

  _loadPlankRecords() {
    this.FirebaseService.plankRecords.child(this.uid)
      .on('value', snapshot => {
        this.plankRecords = snapshot.val();
        this.loadingPlankRecords = false;
      });
  }

  _persistUser() {
    this.FirebaseService.users.child(this.uid)
      .update({name: this.profile.name}, error => {
        if (error) console.log(error);
    });
  }

  static convertSnapshot(snapshotValue): any[] {
    return Object.keys(snapshotValue);
  }
}