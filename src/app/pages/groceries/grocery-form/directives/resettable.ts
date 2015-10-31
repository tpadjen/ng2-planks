import {Directive, NgControl, Host} from 'angular2/angular2';

/**
 * Allows an input to have its control state reset
 */

@Directive({
  selector: '[resettable]'
})
export class Resettable {
  _parent: NgControl;

  constructor(@Host() parent: NgControl) {
    this._parent = parent;
  }

  reset() {
    (<any>this._parent.control)._touched = false;
    (<any>this._parent.control)._pristine = true;
  }
}