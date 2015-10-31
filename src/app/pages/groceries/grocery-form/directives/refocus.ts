import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
  selector: '[refocus]'
})
export class Refocus {

  constructor(private el: ElementRef) {}

  refocus() {
    this.el.nativeElement.focus();
  }
}