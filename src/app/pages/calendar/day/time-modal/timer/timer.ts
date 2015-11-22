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
  @Input() goal: number = 0;
  playing = null;

  // display times
  minutes: string = "00";
  seconds: string = "00";

  // internal times
  _t: number = 0;           // total time in milliseconds
  _startTime: number = 0;   // time when play pressed
  _initTime: number = 0;    // time when last paused

  constructor() {}

  // total time in seconds
  get time() {
    return Math.floor(this._t / 1000);
  }

  get done() {
    return this.time >= this.goal;
  }

  get percent() {
    return this.goal == 0 ? 100 : (this._t / this.goal / 1000) * 100;
  }

  play() {
    this._startTime = new Date().getTime();
    this._initTime = this._t;
    this.playing = setInterval(() => {
      let timeDifference: number = new Date().getTime() - this._startTime;
      let newTime: number = timeDifference + this._initTime;
      let timeChanged: boolean = Math.floor(newTime/1000) > this.time;
      this._t = newTime;
      if (timeChanged) this._calculateTimePieces();
    }, 50);
  }

  togglePlay(event) {
    event.stopPropagation();
    this.playing == null ? this.play() : this.pause();
  }

  stop() {
    this.pause();
    this.reset();
  }

  reset() {
    if (!this.playing) {
      this._t = 0;
      this.minutes = "00";
      this.seconds = "00";
    }
  }

  pause() {
    clearTimeout(this.playing);
    this.playing = null;
  }



  _calculateTimePieces() {
    this.minutes = this._minutesPart();
    this.seconds = this._secondsPart();
  }

  _minutesPart(): string {
    if(this._timeIsNotSet()) return "00";

    let min = Math.floor(this._t / 1000 / 60);
    return min < 10 ? "0" + min : "" + min;
  }

  _secondsPart(): string {
    if(this._timeIsNotSet()) return "00";

    let sec = Math.floor(this._t / 1000 % 60);
    return sec < 10 ? "0" + sec : "" + sec;
  }

  _timeIsNotSet() {
    return !this._t || this._t == undefined || this._t == NaN;
  }

}