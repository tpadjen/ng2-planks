import {Injectable} from 'angular2/angular2';

import {GroceryItem} from '../models/grocery-item/grocery-item';

@Injectable()
export class GroceryService {
  public items: Array<GroceryItem> = [
    {
      name: 'Eggs',
      quantity: 2,
      units: 'dozen'
    },
    {
      name: 'Apples',
      quantity: 3,
      units: null
    },
    {
      name: 'Cheddar Cheese',
      quantity: 8,
      units: 'oz'
    },
    {
      name: 'Broccoli',
      quantity: 1,
      units: 'lbs'
    }
  ];

  addItem(item: GroceryItem) {
    this.items.unshift(item);
  }

  getBlankItem(): GroceryItem {
    return {
        name: '',
        quantity: 1,
        units: null
    }
  }
}