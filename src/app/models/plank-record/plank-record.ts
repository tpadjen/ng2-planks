export class PlankRecord {
  public date: Date;
  public time: number;

  static convertSnapshot = function(snapshotValue): any[] {
    return Object.keys(snapshotValue).map(key => {
      var item = snapshotValue[key];
      item.key = key;
      return item;
    }).reverse();
  }

}