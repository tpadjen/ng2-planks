import {Component, NgIf, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {dropdown} from 'ng2-bootstrap/ng2-bootstrap';

import {UserService} from '../../services/user-service';

let styles = require('./navbar.css');
let template = require('./navbar.html');

@Component({
  selector: 'navbar',
  directives: [RouterLink, NgIf, NgFor, dropdown],
  pipes: [],
  styles: [styles],
  template: template
})
export class Navbar {

  constructor(public User: UserService) {}

}