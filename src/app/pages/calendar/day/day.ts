import {Component, Input, Attribute, NgIf} from 'angular2/angular2';

// import {GroceryService} from '../../../services/grocery-service';
// import {ItemName} from './item-name/item-name';

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
    '(click)': 'onClick($event)'
  }
})
export class Day {
  @Input() date: Date;
  @Input() objective: number;

  planked: boolean = false;
  animateIn: boolean = false;
  animateOut: boolean = false;

  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  daysAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  months = ['January','February','March',
            'April','May','June','July',
            'August','September','October',
            'November','December'];

  constructor() {}

  get onOrBeforeToday() {
    var clone = new Date(this.date.getTime()).setHours(0,0,0,0);
    return new Date().setHours(0,0,0,0) >= clone;
  }

  get today() {
    var clone = new Date(this.date.getTime()).setHours(0,0,0,0);
    return new Date().setHours(0,0,0,0) == clone;
  }

  onClick(event) {
    if (!this.onOrBeforeToday) return;

    this.planked = !this.planked;
    if (this.planked) {
      this.animateIn = true;
    } else {
      this.animateOut = true;
    }
    setTimeout(() => {
      this.animateIn = false;
      this.animateOut = false;
    }, 1000);
  }

}