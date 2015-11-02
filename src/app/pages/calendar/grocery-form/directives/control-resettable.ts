import {
  forwardRef,
  Host,
  SkipSelf,
  Provider,
  Inject,
  Optional
} from 'angular2/src/core/di';
import {
  Directive,
  NgControlName,
  NgControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALIDATORS
} from 'angular2/angular2';
import {NG_VALUE_ACCESSOR} from 'angular2/src/core/forms/directives/control_value_accessor';

@Directive({
  selector: '[ng-control]',
  inputs: ['name: ngControl', 'model: ngModel'],
  outputs: ['update: ngModelChange'],
  exportAs: 'form'
})
export class ControlResettable extends NgControlName {

    constructor( @Host() @SkipSelf() parent: ControlContainer,
        @Optional() @Inject(NG_VALIDATORS) validators:
                  /* Array<Validator|Function> */ any[],
        @Optional() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
    ) {
      super(parent, validators, valueAccessors);
    }

    reset() {
      (<any>this.control)._touched = false;
      (<any>this.control)._pristine = true;
    }
}