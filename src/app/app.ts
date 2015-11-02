import {Component, NgIf} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

import {HomePage} from './pages/home/home';
import {CalendarPage} from './pages/calendar/calendar';

import {UserService} from './services/user-service';

// import {FirebaseEventPipe} from './pipes/firebase';

@RouteConfig([
  {path: '/', component: HomePage, as: 'Home'}
  {path: '/Calendar', component: CalendarPage, as: 'Calendar'}
])
@Component({
  selector: 'app',
  directives: [RouterOutlet, RouterLink, NgIf],
  pipes: [],
  template: `
    <nav class="navbar navbar-fixed-top">
      <a [router-link]="['/Home']" class="navbar-brand">Planks!</a>
      <ul class="nav navbar-nav" *ng-if="User.isLoggedIn()">
        <li class="nav-item">
          <a [router-link]="['/Calendar']" class="nav-link">Calendar</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right" *ng-if="User.isLoggedIn()">
        <li class="nav-item">
          <a href="{{User.profile?.link}}" class="nav-link">{{User.profile?.name}}</a>
        </li>
        <li class="nav-item">
          <a href="{{User.profile?.link}}">
            <img class="thumb" src="{{User.profile?.picture}}" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" (click)="User.signOut()">Sign Out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid main">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app/app.css']
})
export class AppComponent {

  constructor(public User: UserService) {}
}