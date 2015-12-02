import {
  Component,
  FORM_DIRECTIVES,
  NgFor,
  NgIf,
  Input
} from 'angular2/angular2';

// import {GroceryItem} from '../../../models/grocery-item/grocery-item';
import {UserService} from '../../../services/user-service';
import {PlanksService} from '../../../services/planks-service';
import {Day} from '../day/day';
import {Help} from './help/help';

let styles = require('./month.css');
let template = require('./month.html');

@Component({
  selector: 'month',
  directives: [Day, Help, FORM_DIRECTIVES, NgFor, NgIf],
  pipes: [],
  styles: [styles],
  template: template
})
export class Month {
  @Input() interactive: boolean;
  @Input() member: any;

  today = new Date();
  startDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthName = this.monthNames[this.today.getMonth()];
  nDays: number = daysInMonth(this.startDate);
  dates = getDates(this.startDate, addDays(this.startDate, this.nDays - 1));
  weeks = chunk(this.dates, 7);

  constructor(public User: UserService, public Planks: PlanksService) {
    // remove null padding on first week
    for (var i = 0; i < this.startDate.getDay(); i++) {
      this.weeks[0].shift();
    }
  }

}

function daysInMonth(anyDateInMonth) {
  return new Date(anyDateInMonth.getYear(),
                  anyDateInMonth.getMonth()+1,
                  0).getDate();
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();

    // add null padding to first week so start of month is correct day
    // and chunks end on saturdays
    for (var i = 0; i < startDate.getDay(); i++) {
      dateArray.push(null);
    }

    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(start, days) {
  var date = new Date(start.valueOf())
  date.setDate(date.getDate() + days);
  return date;
}

function chunk(a, chunkSize) {
  var array = a;
  return [].concat.apply([],
    array.map(function(elem,i) {
      return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
    })
  );
}