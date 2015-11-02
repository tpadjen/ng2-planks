export class User {
  constructor(private authData: any) {}

  get name(): string {
    return this.profile ? this.profile.name : null;
  }

  get profile(): any {
    return this.authData ? this.authData.google.cachedUserProfile : null;
  }

  get uid(): string {
    return this.authData ? this.authData.uid : null;
  }

  static convertSnapshot(snapshotValue): any[] {
    return Object.keys(snapshotValue);
  }
}