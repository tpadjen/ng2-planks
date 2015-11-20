import {Component, NgIf} from 'angular2/angular2';

import {ToTimePipe} from './pipes/to-time';

let styles = require('./timer.css');
let template = require('./timer.html');

@Component({
  selector: 'timer',
  directives: [NgIf],
  pipes: [ToTimePipe],
  styles: [styles],
  template: template
})
export class Timer {
  time: number = 0;
  playing = null;

  constructor() {}

  play() {
    this.playing = setInterval(() => {
      this.time += 0.1;
    }, 100);
  }

  togglePlay(event) {
    event.stopPropagation();
    this.playing == null ? this.play() : this.pause();
  }

  stop(event) {
    this.pause();
    this.time = 0;
  }

  pause() {
    clearTimeout(this.playing);
    this.playing = null;
  }

}