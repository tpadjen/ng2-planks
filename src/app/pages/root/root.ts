import {Component, NgIf} from 'angular2/angular2';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'root-page',
  directives: [NgIf],
  pipes: [],
  styles: ['app/pages/root/root.css'],
  templateUrl: 'app/pages/root/root.html'
})
export class RootPage {

  constructor(public User: UserService) {}

  signIn() {
    this.User.authWithGoogle();
  }

  isLoggedIn() {
    return this.User.isLoggedIn();
  }

}