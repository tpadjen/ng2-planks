import {Component, NgIf} from 'angular2/angular2';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'home-page',
  directives: [NgIf],
  pipes: [],
  styles: ['app/pages/home/home.css'],
  templateUrl: 'app/pages/home/home.html'
})
export class HomePage {

  constructor(public User: UserService) {}

  signIn() {
    this.User.authWithGoogle();
  }

  isLoggedIn() {
    return this.User.isLoggedIn();
  }

}