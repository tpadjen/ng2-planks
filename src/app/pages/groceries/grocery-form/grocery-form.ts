import {
  Component,
  FORM_DIRECTIVES,
  NgFor,
  ViewChild,
  ViewChildren,
  QueryList
} from 'angular2/angular2';

import {GroceryItem} from '../../../models/grocery-item/grocery-item';
import {GroceryService} from '../../../services/grocery-service';
import {Resettable} from './directives/resettable';
import {Refocus} from './directives/refocus';

@Component({
  selector: 'grocery-form',
  directives: [FORM_DIRECTIVES, NgFor, Resettable, Refocus],
  pipes: [],
  styleUrls: ['app/pages/groceries/grocery-form/grocery-form.css'],
  templateUrl: 'app/pages/groceries/grocery-form/grocery-form.html'
})
export class GroceryForm {
  public item: GroceryItem;
  units: Array<string> = GroceryItem.UNITS;
  @ViewChild(Refocus) firstInput: Refocus;
  @ViewChildren(Resettable) resets: QueryList<Resettable>;

  constructor(private GroceryService: GroceryService) {
    this.item = GroceryService.getBlankItem();
  }

  onSubmit() {
    this.GroceryService.addItem(this.item);
    this.item = this.GroceryService.getBlankItem();
    this.resets.map(control => control.reset());
    if (this.firstInput) {
      this.firstInput.refocus();
    }
  }

}