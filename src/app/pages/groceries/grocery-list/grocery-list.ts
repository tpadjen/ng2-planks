import {Component, NgFor} from 'angular2/angular2';

import {GroceryService} from '../../../services/grocery-service';
import {ItemName} from './item-name/item-name';

@Component({
  selector: 'grocery-list',
  directives: [NgFor, ItemName],
  pipes: [],
  styleUrls: ['app/pages/groceries/grocery-list/grocery-list.css'],
  templateUrl: 'app/pages/groceries/grocery-list/grocery-list.html'
})
export class GroceryList {

  constructor(public groceryService: GroceryService) { }

  removeItem(item) {
    this.groceryService.removeItem(item);
  }

}