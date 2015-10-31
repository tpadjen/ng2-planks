import {Component} from 'angular2/angular2';

import {GroceryList} from './grocery-list/grocery-list';
import {GroceryForm} from './grocery-form/grocery-form';

@Component({
  selector: 'groceries-page',
  directives: [GroceryList, GroceryForm],
  pipes: [],
  styles: [],
  templateUrl: 'app/pages/groceries/groceries.html'
})
export class GroceriesPage {

  constructor() {}

}