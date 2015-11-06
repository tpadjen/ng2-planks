import {Component, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {Router, RouterLink} from 'angular2/router';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'root-page',
  directives: [NgIf, FORM_DIRECTIVES, RouterLink],
  pipes: [],
  styles: [require('./root.css')],
  templateUrl: 'app/pages/root/root.html'
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