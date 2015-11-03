import {
  Component,
  FORM_DIRECTIVES,
  NgFor
} from 'angular2/angular2';

// import {GroceryItem} from '../../../models/grocery-item/grocery-item';
// import {GroceryService} from '../../../services/grocery-service';
import {Day} from '../day/day';

@Component({
  selector: 'month',
  directives: [Day, FORM_DIRECTIVES, NgFor],
  pipes: [],
  styleUrls: ['app/pages/calendar/month/month.css'],
  templateUrl: 'app/pages/calendar/month/month.html'
})
export class Month {

  startDate: Date = new Date('November 1, 2015 11:00:53 AM');
  nDays: number = daysInMonth(this.startDate);
  // days: any[] = new Array(this.nDays);
  // nWeeks: number = Math.ceil(this.nDays / 7);
  // // weeks: any[] = new Array(this.nWeeks);
  // daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday',
  //                   'Wednesday', 'Thursday',
  //                   'Friday', 'Saturday'];
  dates = getDates(this.startDate, addDays(this.startDate, this.nDays - 1));
  weeks = chunk(this.dates, 7);

  constructor() {}

}

function daysInMonth(anyDateInMonth) {
  return new Date(anyDateInMonth.getYear(),
                  anyDateInMonth.getMonth()+1,
                  0).getDate();
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(start, days) {
  var dat = new Date(start.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

function chunk(a, chunkSize) {
  var array = a;
  return [].concat.apply([],
    array.map(function(elem,i) {
      return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
    })
  );
}