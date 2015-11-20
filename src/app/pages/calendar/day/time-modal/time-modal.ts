import {Component, NgIf, Input, Output, ViewChild, EventEmitter} from 'angular2/angular2';

import {MinutesPipe} from '../../../../pipes/minutes';

import {Progressbar} from 'ng2-bootstrap/ng2-bootstrap';
import {Modal} from '../../../../components/modal/modal';
import {Timer} from './timer/timer';

let styles = require('./time-modal.css');
let template = require('./time-modal.html');

@Component({
  selector: 'time-modal',
  directives: [Modal, Progressbar, Timer, NgIf],
  pipes: [MinutesPipe],
  styles: [styles],
  template: template
})
export class TimeModal {
  timing: boolean = false;
  inputing: boolean = false;

  @Input() goal: number = 0;
  @Input() title: string = "";

  @ViewChild(Modal) modal: Modal;
  @ViewChild(Timer) timer: Timer;

  @Output() confirm: EventEmitter = new EventEmitter();
  @Output() cancel: EventEmitter = new EventEmitter();

  constructor() {}

  show() {
    this.modal.show();
  }

  onConfirm(event) {
    if (this.timer) {
      this.confirm.next(this.timer.timeInSeconds);
      this.timer.stop();
    }

    this.reset();
  }

  onCancel(event) {
    if (this.timer) this.timer.stop();
    this.cancel.next(null);
    this.reset();
  }

  reset() {
    this.timing = false;
    this.inputing = false;
  }

}