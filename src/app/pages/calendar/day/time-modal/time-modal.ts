import {Component, NgIf, Input, Output, ViewChild, EventEmitter} from 'angular2/angular2';

import {MinutesPipe} from '../../../../pipes/minutes';

import {Progressbar} from 'ng2-bootstrap/ng2-bootstrap';
import {Modal} from '../../../../components/modal/modal';
import {Timer} from '../timer/timer';

@Component({
  selector: 'time-modal',
  directives: [Modal, Progressbar, Timer, NgIf],
  pipes: [MinutesPipe],
  styles: [],
  template: `
    <modal
      (confirm)="onConfirm($event)"
      (cancel)="onCancel($event)"
      [title]="title"
      [confirmable]="true"
      confirm-button-text="I did it!"
      cancel-button-text="Cancel"
    >
      <div class="goal">
        Goal: <span class="number">{{goal | minutes}}
                <i class="fa fa-thumbs-up animated tada"
                   *ng-if="timer.done"></i>
              </span>
      </div>
      <progress class="progress"
        [class.progress-success]="timer.done"
        [value]="timer.percent || 0"
        max="100"
      ></progress>
      <timer #timer [goal]="goal"></timer>
    </modal>
  `
})
export class TimeModal {
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
    this.confirm.next(this.timer.timeInSeconds);
    this.timer.stop();
  }

  onCancel(event) {
    this.timer.stop();
    this.cancel.next(null);
  }

}