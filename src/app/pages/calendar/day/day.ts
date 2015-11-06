import {Component, Input, Attribute, NgIf} from 'angular2/angular2';

import {UserService} from '../../../services/user-service';
import {FirebaseService} from '../../../services/firebase-service';
import {PlankRecord} from '../../../models/plank-record/plank-record';

let styles = require('./day.css').toString();

@Component({
  selector: 'td[day]',
  directives: [NgIf],
  pipes: [],
  styles: [styles],
  templateUrl: 'app/pages/calendar/day/day.html',
  host: {
    '[class.past]': 'onOrBeforeToday',
    '[class.today]': 'today',
    '[class.planked]': 'planked',
    '[class.rest]': 'rest',
    '(click)': 'onClick($event)'
  }
})
export class Day {
  @Input() date: Date;
  @Input() objective: any;
  @Input() interactive: boolean;
  @Input() member: any;

  animateIn: boolean = true;
  animateOut: boolean = false;
  _planked: boolean = false;

  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  daysAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  months = ['January','February','March',
            'April','May','June','July',
            'August','September','October',
            'November','December'];

  constructor() { }

  onInit() {
    this.animateIn = true;
    this.animateFor(800);
  }

  get loading() {
    return this.member.loadingPlankRecords();
  }

  get planked() {
    if (this.loading) return false;

    return this.member.plankedOn(this._dateAtMidnight());
  }

  get rest() {
    if (this.loading) return false;

    return this.objective == "Rest";
  }

  get onOrBeforeToday() {
    if (this.loading) return false;

    var clone = new Date(this.date.getTime()).setHours(0,0,0,0);
    return this._todayAtMidnight() >= this._dateAtMidnight();
  }

  get today() {
    if (this.loading) return false;

    return this._todayAtMidnight() == this._dateAtMidnight();
  }

  onClick(event) {
    if (!this.interactive) return false;

    if (!this.onOrBeforeToday) return false;
    if (this.objective == "Rest") return false;

    if (!this.planked) {
      this.member.setPlankRecord(this._dateAtMidnight());
      this.animateIn = true;
      this.animateFor(800);
    } else {
      this.member.removePlankRecord(this._dateAtMidnight());
      this.animateOut = true;
      this.animateFor(300);
    }

    return false;
  }

  animateFor(time) {
    setTimeout(() => {
      this.animateIn = false;
      this.animateOut = false;
    }, time);
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