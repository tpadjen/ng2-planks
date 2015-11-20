import {Component, Input, NgIf} from 'angular2/angular2';

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
  public time: number = 0;
  @Input() goal: number = 0;
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

  stop() {
    this.pause();
    this.time = 0;
  }

  pause() {
    clearTimeout(this.playing);
    this.playing = null;
  }

  get done() {
    return this.time >= this.goal;
  }

  get percent() {
    return this.goal == 0 ? 100 : (this.time / this.goal) * 100;
  }

  get timeInSeconds() {
    return Math.floor(this.time);
  }

}