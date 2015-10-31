import {Component} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';


@RouteConfig([
])
@Component({
  selector: 'app',
  template: `
    <nav class="navbar navbar-fixed-top">
      <ul class="nav navbar-nav">
        <li class="nav-item">
        </li>
        <li class="nav-item">
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