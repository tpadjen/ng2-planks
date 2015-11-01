import {Component, Input, Output, ElementRef, EventEmitter} from 'angular2/angular2';

import {GroceryItem} from '../../../../models/grocery-item/grocery-item';
import {GroceryService} from '../../../../services/grocery-service';

@Component({
  selector: 'item-name',
  directives: [],
  pipes: [],
  styles: [],
  template: `<span
      contentEditable
      (keydown)="onKeydown($event)"
      (blur)="updateItem()"
    >{{item.name}}</span>`
})
export class ItemName {
  @Input() item: GroceryItem;
  @Output() update = new EventEmitter();
  public editing = false;

  constructor(public el: ElementRef, private groceryService: GroceryService) {}

  onKeydown(event) {
    if (event.keyCode == 13) {
      this.removeFocus();
      this.updateItem();
      return false;
    }
  }

  updateItem() {
    this.groceryService.updateItem(this.item.key,
          {name: this.el.nativeElement.textContent});
  }

  removeFocus() {
    // create a new contenteditable to gain focus
    // then remove it, otherwise focus is retained
    var div = document.createElement('div');
    div.contentEditable = 'true';
    this.el.nativeElement.appendChild(div);
    div.focus()
    div.remove();
  }

}