export class PlankRecord {
  public date: number;
  public uid: string;

  static convertSnapshot = function(snapshotValue): any[] {
    return snapshotValue;
    // return Object.keys(snapshotValue).map(key => {
    //   var item = snapshotValue[key];
    //   item.key = key;
    //   return item;
    // }).reverse();
  }

}