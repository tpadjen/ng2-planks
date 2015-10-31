import {Component, FORM_DIRECTIVES, NgFor, EventEmitter, NgControl} from 'angular2/angular2';

import {GroceryItem} from '../../../models/grocery-item/grocery-item';
import {GroceryService} from '../../../services/grocery-service';

@Component({
  selector: 'grocery-form',
  directives: [FORM_DIRECTIVES, NgFor],
  pipes: [],
  styleUrls: ['app/pages/groceries/grocery-form/grocery-form.css'],
  templateUrl: 'app/pages/groceries/grocery-form/grocery-form.html'
})
export class GroceryForm {
  public item: GroceryItem;
  units: Array<string> = GroceryItem.UNITS;

  constructor(private GroceryService: GroceryService) {
    this.item = GroceryService.getBlankItem();
  }

  onSubmit(nameInput, nameControl: NgControl) {
    this.GroceryService.addItem(this.item);
    this.item = this.GroceryService.getBlankItem();
    this._resetControl(nameControl.control);
    nameInput.focus();
  }

  _resetControl(control) {
      (<any>control)._touched = false;
      (<any>control)._pristine = true;
  }

}