export class GroceryItem {

  static UNITS: Array<string> = ['oz', 'cups', 'lbs'];

  public name: string;
  public quantity: number;

  set units(u) {
    if (GroceryItem.UNITS.indexOf(u) != -1) {
      this.units = u;
    } else {
      this.units = null;
    }
  }

}