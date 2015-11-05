import {Component, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'root-page',
  directives: [NgIf, FORM_DIRECTIVES, RouterLink],
  pipes: [],
  styleUrls: ['app/pages/root/root.css'],
  templateUrl: 'app/pages/root/root.html'
})
export class RootPage {

  constructor(public User: UserService) {}

  signIn() {
    this.User.authWithGoogle();
  }

}