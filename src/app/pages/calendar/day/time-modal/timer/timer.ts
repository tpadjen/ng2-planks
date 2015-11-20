import {Component, Input, NgIf} from 'angular2/angular2';

let styles = require('./timer.css');
let template = require('./timer.html');

@Component({
  selector: 'timer',
  directives: [NgIf],
  pipes: [],
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

  _t: number = 0;
  _min: number = 0;
  _sec: number = 0;
  _tenths: number = 0;

  get minutesPart() {
    if(!this.time || this.time == undefined || this.time == NaN) return "00";

    this._t = this.time;
    this._min = Math.floor(this._t / 60);
    return this._min < 10 ?  "0" + this._min : "" + this._min;
  }

  get secondsPart() {
    if(!this._t || this._t == undefined || this._t == NaN) return "00";

    this._sec = this._t - 60*this._min;
    let seconds = Math.floor(this._sec);
    this._tenths = Math.floor((this._sec - seconds)*10);
    return seconds < 10 ?  "0" + seconds : "" + seconds;
  }

  get tenthsPart() {
    if(!this._t || this._t == undefined || this._t == NaN) return "0";

    return this._tenths+"";
  }

}