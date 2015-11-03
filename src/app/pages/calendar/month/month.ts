import {
  Component,
  FORM_DIRECTIVES,
  NgFor
} from 'angular2/angular2';

// import {GroceryItem} from '../../../models/grocery-item/grocery-item';
import {UserService} from '../../../services/user-service';
import {PlanksService} from '../../../services/planks-service';
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
  objectives;

  constructor(public User: UserService, public Planks: PlanksService) {
    this.Planks.objectives.then((objectives) => {
      console.log("Objectives");
      console.log(objectives.val());
      this.objectives = objectives.val();
    }, (error) => {
      console.log("Error");
      console.log(error);
    })
    // this.User.plankRecords.then((snapshot) => {
    //   console.log(snapshot.val());
    // });

    // var objectives = {};
    // var values = [20, 30, 30, 35, 0, 40, 45, 45, 50, 0, 60, 60, 70, 80, 0,
    //       80, 90, 90, 105, 0, 105, 105, 120, 120, 0, 135, 135, 150, 165, 180]

    // this.dates.forEach((date, index) => {
    //   var clone = new Date(date.getTime()).setHours(0,0,0,0);
    //   objectives[clone] = values[index];
    // });

    // this.Planks.setObjectives(objectives).then((value) => {console.log("Success");}, (error) => {console.log(error);})
  }

  objectiveFor(date) {
    if (!this.objectives) return 0;

    var clone = new Date(date.getTime()).setHours(0,0,0,0);
    return this.objectives[clone];
  }



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