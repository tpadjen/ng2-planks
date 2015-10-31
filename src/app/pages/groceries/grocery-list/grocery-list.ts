import {Component, NgFor} from 'angular2/angular2';

import {GroceryService} from '../../../services/grocery-service';

import {FirebaseEventPipe} from '../../../pipes/firebase';

@Component({
  selector: 'grocery-list',
  directives: [NgFor],
  pipes: [FirebaseEventPipe],
  styleUrls: ['app/pages/groceries/grocery-list/grocery-list.css'],
  templateUrl: 'app/pages/groceries/grocery-list/grocery-list.html'
})
export class GroceryList {

  constructor(public groceryService: GroceryService) { }

}