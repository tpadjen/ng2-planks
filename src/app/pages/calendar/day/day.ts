import {Component, Input, Attribute, NgIf} from 'angular2/angular2';

import {UserService} from '../../../services/user-service';
import {FirebaseService} from '../../../services/firebase-service';
import {PlankRecord} from '../../../models/plank-record/plank-record';

@Component({
  selector: 'td[day]',
  directives: [NgIf],
  pipes: [],
  styleUrls: ['app/pages/calendar/day/day.css'],
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

  animateIn: boolean = true;
  animateOut: boolean = false;
  _planked: boolean = false;

  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  daysAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  months = ['January','February','March',
            'April','May','June','July',
            'August','September','October',
            'November','December'];

  constructor(public User: UserService) { }

  onInit() {
    this.animateIn = true;
    this.animateFor(1000);
  }

  get planked() {
    return this.User.plankedOn(this._dateAtMidnight());
  }

  get rest() {
    return this.objective == "Rest";
  }

  get onOrBeforeToday() {
    var clone = new Date(this.date.getTime()).setHours(0,0,0,0);
    return this._todayAtMidnight() >= this._dateAtMidnight();
  }

  get today() {
    return this._todayAtMidnight() == this._dateAtMidnight();
  }

  onClick(event) {
    if (!this.onOrBeforeToday) return;
    if (this.objective == "Rest") return;

    if (!this.planked) {
      this.User.setPlankRecord(this._dateAtMidnight());
      this.animateIn = true;
    } else {
      this.User.removePlankRecord(this._dateAtMidnight());
      this.animateOut = true;
    }

    this.animateFor(1000);

  }

  animateFor(time) {
    setTimeout(() => {
      this.animateIn = false;
      this.animateOut = false;
    }, time);
  }

  _dateAtMidnight(): number {
    return this._timeAtMidnight(this._cloneDate(this.date))
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