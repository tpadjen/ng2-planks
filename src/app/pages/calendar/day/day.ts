import {Component, Input, Attribute, NgIf, ViewChild} from 'angular2/angular2';

import {UserService} from '../../../services/user-service';
import {FirebaseService} from '../../../services/firebase-service';
import {TimedRecord} from '../../../models/timed-record/timed-record';

import {MinutesPipe} from '../../../pipes/minutes';

import {TimeModal} from './time-modal/time-modal';

let styles = require('./day.css');
let template = require('./day.html');

@Component({
  selector: 'td[day]',
  directives: [TimeModal, NgIf],
  pipes: [MinutesPipe],
  styles: [styles],
  template: template,
  host: {
    '[class.past]': 'onOrBeforeToday',
    '[class.today]': 'today',
    '[class.succeeded]': 'succeeded',
    '[class.rest]': 'rest',
    '(click)': 'onClick($event)'
  }
})
export class Day {
  @Input() date: Date;
  @Input() objective: any;
  @Input() interactive: boolean;
  @Input() member: any;
  public loading = true;
  @ViewChild(TimeModal) modal: TimeModal;

  animateIn: boolean = true;
  animateOut: boolean = false;
  _succeeded: boolean = false;

  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  daysAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  months = ['January','February','March',
            'April','May','June','July',
            'August','September','October',
            'November','December'];

  constructor() {

  }

  onInit() {
    this.member.waitForLoad().then(() => {
      this.loading = false;
    });
  }

  get succeeded() {
    if (this.loading) return false;

    return this.member.succeededOn(this._dateAtMidnight());
  }

  get time() {
    if (this.loading) return 0;

    return this.member.timeFor(this._dateAtMidnight());
  }

  get rest() {
    if (this.loading) return false;

    return this.objective == "Rest" || this.objective == 0;
  }

  get onOrBeforeToday() {
    if (this.loading || this.objective == "Rest") return false;

    var clone = new Date(this.date.getTime()).setHours(0,0,0,0);
    return this._todayAtMidnight() >= this._dateAtMidnight();
  }

  get today() {
    if (this.loading) return false;

    return this._todayAtMidnight() == this._dateAtMidnight();
  }

  get _clickable() {
    return !this.loading && this.interactive && !this.rest && this.onOrBeforeToday;
  }

  beatObjective() {
    return this.succeeded && this.time > this.objective;
  }

  onClick(event) {
    if (!this._clickable) return false;

    if (this.succeeded) {
      this.unsetSucceeded();
      return false;
    }
    if (this.modal) this.modal.show();

    return false;
  }

  setTimedRecord(time) {
    this.member.setTimedRecord(this._dateAtMidnight(), time);
    this.animateIn = true;
    this.animateFor(800);
  }

  unsetSucceeded() {
    this.member.removeRecord(this._dateAtMidnight());
    this.animateOut = true;
    this.animateFor(300);
  }

  animateFor(time) {
    setTimeout(() => {
      this.animateIn = false;
      this.animateOut = false;
    }, time);
  }

  get longDate() {
    return this.days[this.date.getDay()] + " " + (this.date.getMonth()+1) +
      "/" + this.date.getDate() + "/" + this.date.getFullYear();
  }

  _dateAtMidnight(): number {
    return this._timeAtMidnight(this._cloneDate(this.date));
  }

  _todayAtMidnight() {
    return this._timeAtMidnight(new Date());
  }

  _cloneDate(date): Date {
    return new Date(date.getTime());
  }

  _timeAtMidnight(date): number {
    return date.setHours(0,0,0,0);
  }

}