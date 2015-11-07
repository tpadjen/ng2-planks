import {Component, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {Router, RouterLink} from 'angular2/router';

import {UserService} from '../../services/user-service';

let styles = require('./root.css');
let template = require('./root.html');

@Component({
  selector: 'root-page',
  directives: [NgIf, FORM_DIRECTIVES, RouterLink],
  pipes: [],
  styles: [styles],
  template: template
})
export class RootPage {

  constructor(public User: UserService, public router: Router) {}

  signIn() {
    this.User.authWithGoogle();
  }

  onActivate() {
    if (this.User.doesExist()) {
      this.router.navigate(['/Member', {id: this.User.id}]);
      return false;
    }

    return true;
  }

}