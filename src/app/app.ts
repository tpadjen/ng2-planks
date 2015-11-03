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
  template: `
    <nav class="navbar navbar-fixed-top">
      <a [router-link]="['/Root']" class="navbar-brand">Planks!</a>
      <ul class="nav navbar-nav" *ng-if="User.isLoggedIn()">
        <li class="nav-item">
          <a [router-link]="['/Home']" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a [router-link]="['/Calendar']" class="nav-link">Calendar</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right" *ng-if="User.isLoggedIn()">
        <li class="nav-item user-name">
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