import {
  Component,
  NgIf,
  Directive,
  Inject,
  Attribute,
  DynamicComponentLoader,
  ElementRef
} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';

import {RootPage} from './pages/root/root';
import {HomePage} from './pages/home/home';
import {CalendarPage} from './pages/calendar/calendar';

import {UserService} from './services/user-service';

@RouteConfig([
  {path: '/', component: RootPage, as: 'Root'},
  {path: '/home', component: HomePage, as: 'Home'},
  {path: '/calendar', component: CalendarPage, as: 'Calendar'}
])
@Component({
  selector: 'app',
  directives: [RouterOutlet, RouterLink, NgIf],
  pipes: [],
  styleUrls: ['app/app.css'],
  templateUrl: 'app/app.html'
})
export class AppComponent {

  constructor(public User: UserService) {}
}