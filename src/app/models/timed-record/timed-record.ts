export class TimedRecord {
  public date: number;
  public uid: string;
  public time: number;

  static convertSnapshot = function(snapshotValue): any[] {
    console.log(snapshotValue);
    return snapshotValue;
    // return Object.keys(snapshotValue).map(key => {
    //   var item = snapshotValue[key];
    //   item.key = key;
    //   return item;
    // }).reverse();
  }

}