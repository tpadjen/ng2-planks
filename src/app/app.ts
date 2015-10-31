import {Component} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

import {HomePage} from './pages/home/home';
import {GroceriesPage} from './pages/groceries/groceries';

@RouteConfig([
  {path: '/', component: HomePage, as: 'Home'},
  {path: '/groceries', component: GroceriesPage, as: 'Groceries'}
])
@Component({
  selector: 'app',
  directives: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-fixed-top">
      <a [router-link]="['/Home']" class="navbar-brand">ng2-seed</a>
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a [router-link]="['/Home']" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a [router-link]="['/Groceries']" class="nav-link">Groceries</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid main">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app/app.css']
})
export class AppComponent {}