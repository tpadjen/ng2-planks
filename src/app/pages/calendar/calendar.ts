import {Component, NgIf} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {AuthenticatedPage} from '../authenticated-page';

// import {GroceryList} from './grocery-list/grocery-list';
// import {GroceryForm} from './grocery-form/grocery-form';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'calendar-page',
  directives: [NgIf],
  pipes: [],
  styles: [],
  templateUrl: 'app/pages/calendar/calendar.html'
})
export class CalendarPage extends AuthenticatedPage {

  constructor(public User: UserService, public router: Router) {
    super(User, router);
  }

}