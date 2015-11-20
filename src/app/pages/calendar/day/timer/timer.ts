import {Component} from 'angular2/angular2';

let styles = require('./timer.css');
let template = require('./timer.html');

@Component({
  selector: 'timer',
  directives: [],
  pipes: [],
  styles: [styles],
  template: template
})
export class Timer {

  constructor() {}

}