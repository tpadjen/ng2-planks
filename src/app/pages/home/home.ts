import {Component, NgIf, Injector, provide} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {AuthenticatedPage} from '../authenticated-page';

import {UserService} from '../../services/user-service';
import {FirebaseService} from '../../services/firebase-service';

@Component({
  selector: 'home-page',
  directives: [NgIf],
  pipes: [],
  styles: ['app/pages/home/home.css'],
  templateUrl: 'app/pages/home/home.html'
})
export class HomePage extends AuthenticatedPage {

  constructor(public User: UserService, public router: Router) {
    super(User, router);
  }

}