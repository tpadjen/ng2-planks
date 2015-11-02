import {Component} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {UserService} from '../services/user-service';

@Component({})
export class AuthenticatedPage {

  constructor(public User: UserService, public router: Router) {}

  onActivate() {
    if (!this.User.isLoggedIn()) {
      this.router.navigate(['/Root']);
      return false;
    }

    return true;
  }

}