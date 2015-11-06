import {
  Component,
  NgIf,
  NgFor,
  Directive,
  Inject,
  Attribute,
  DynamicComponentLoader,
  ElementRef
} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';

import {Navbar} from './components/navbar/navbar';

import {RootPage} from './pages/root/root';
import {GroupPage} from './pages/group/group';
import {JoinPage} from './pages/join/join';
import {CalendarPage} from './pages/calendar/calendar';

import {UserService} from './services/user-service';

let styles = require('./app.css');

@RouteConfig([
  {path: '/', component: RootPage, as: 'Root'},
  {path: '/join', component: JoinPage, as: 'Join'},
  {path: '/groups/:group', component: GroupPage, as: 'Group'},
  {path: '/member/:id', component: CalendarPage, as: 'Member'}
])
@Component({
  selector: 'app',
  directives: [Navbar, RouterOutlet],
  pipes: [],
  styles: [styles],
  templateUrl: 'app/app.html'
})
export class AppComponent {

  constructor(public User: UserService) {}
}