import {Component, Input, Output} from 'angular2/angular2';

@Component({
  selector: 'input-pane',
  directives: [],
  pipes: [],
  styles: [`
    .time {
      font-size: 3.5rem;
      font-family: 'DigitalMono', monospace;
    }
    .time .punc {
      font-family: 'DigitalReg', sans-serif;
    }
    .pluses {
      position: relative;
      top: 8px;
    }
    .minuses {
      position: relative;
      top: -16px;
    }
    i {
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
    i:first-child {
      margin-right: 1rem;
    }
    i:last-child {
      margin-left: 1rem;
    }
    .fa-undo {
      position: absolute;
      right: 2rem;
      transform: translate(0px, -68px);
    }
    @media(max-width: 32rem) {
      .time, .pluses, .minuses {
        transform: translate(-2rem, 0);
      }
    }
  `],
  template: `
    <div class="pluses">
      <i class="fa fa-plus fa-2x" (click)="changeTime(60)" unselectable="on"></i>
      <i class="fa fa-plus fa-2x" (click)="changeTime(1)" unselectable="on"></i>
    </div>
    <div class="time"><span class="min">{{min}}</span><span class="punc">:</span><span class="sec">{{sec}}</span></div>
    <i class="fa fa-undo fa-3x" (click)="reset()" unselectable="on"></i>
    <div class="minuses">
      <i class="fa fa-minus fa-2x" (click)="changeTime(-60)" unselectable="on"></i>
      <i class="fa fa-minus fa-2x" (click)="changeTime(-1)" unselectable="on"></i>
    </div>
  `
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