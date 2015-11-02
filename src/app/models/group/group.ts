export class Group {
  name: string;

  convertSnapshot(snapshotValue): any[] {
    return Object.keys(snapshotValue);
  }
}