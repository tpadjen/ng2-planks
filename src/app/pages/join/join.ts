import {Component, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {AuthenticatedPage} from '../authenticated-page';

import {UserService} from '../../services/user-service';
import {FirebaseService} from '../../services/firebase-service';

function dasherize(str) {
  return str.trim().toLowerCase().replace(/\s/g, function(char, index) {
    return (index !== 0 ? '-' : '');
  });
};

@Component({
  selector: 'join-page',
  directives: [NgIf, FORM_DIRECTIVES],
  pipes: [],
  styleUrls: ['app/pages/join/join.css'],
  templateUrl: 'app/pages/join/join.html'
})
export class JoinPage extends AuthenticatedPage {
  joinData = {
    group: null,
    password: null
  }

  constructor(public User: UserService, public router: Router, private FirebaseService: FirebaseService) {
    super(User, router);
  }

  joinGroup() {
    if (!this.joinData.group) return false;

    let group = dasherize(this.joinData.group);

    this.User.attemptToJoinGroup(group, this.joinData.password)
      .then(() => {
        this.router.navigate(['/Group', {group: group}]);
      }, (error) => {
        console.log(error);
      });

  }

}