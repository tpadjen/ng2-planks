import {Component, Input, Output} from 'angular2/angular2';

let styles = require('./input-pane.css');
let template = require('./input-pane.html');

@Component({
  selector: 'input-pane',
  directives: [],
  pipes: [],
  styles: [styles],
  template: template
})
export class InputPane {
  @Input() goal: number = 0;
  time: number = 0;

  constructor() {}

  afterViewInit() {
    this.reset();
  }

  reset() {
    this.goal = parseInt(""+this.goal);
    this.time = this.goal;
  }

  get valid() {
    return this.time >= this.goal;
  }

  _min: number = 0;

  get min() {
    this._min = Math.floor(this.time / 60);
    return this._min < 10 ?  "0" + this._min : "" + this._min;
  }

  get sec() {
    let seconds = this.time - this._min*60;
    return seconds < 10 ?  "0" + seconds : "" + seconds;
  }

  changeTime(x: number) {
    if (x < 0 && this.time < x*-1) return;
    this.time += x;
  }

}