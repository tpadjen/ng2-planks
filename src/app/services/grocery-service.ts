import {Injectable} from 'angular2/angular2';

import {GroceryItem} from '../models/grocery-item/grocery-item';

@Injectable()
export class GroceryService {
  private itemsUrl = 'https://brilliant-torch-9227.firebaseio.com/grocery-items';
  private unitsUrl = 'https://brilliant-torch-9227.firebaseio.com/units';
  public itemsRef: Firebase;
  public unitsRef: Firebase;
  public units = [];
  public items = [];

  constructor() {
    this.itemsRef = new Firebase(this.itemsUrl);
    this.unitsRef = new Firebase(this.unitsUrl)

    this.unitsRef.on('value', snapshot => {
      this.units = Object.keys(snapshot.val());
    });
    this.itemsRef.on('value', snapshot => {
      this.items = this._snapshotToItem(snapshot.val());
    });
  }

  onDestroy() {
    if (this.itemsRef) {
      this.itemsRef.off();
    }
    if (this.unitsRef) {
      this.itemsRef.off();
    }
  }

  addItem(item: GroceryItem) {
    this.itemsRef.push(item);
  }

  getBlankItem(): GroceryItem {
    return {
      name: '',
      quantity: 1,
      units: null
    }
  }

  _snapshotToItem(snapshotValue): any[] {
    return Object.keys(snapshotValue).map(_ => snapshotValue[_]).reverse();
  }
}