import {Component, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {Router, CanActivate} from 'angular2/router';

import {Page} from '../page';
import {isLoggedIn} from '../auth';

import {UserService} from '../../services/user-service';

let styles = require('./join.css');
let template = require('./join.html');

function dasherize(str) {
  return str.trim().toLowerCase().replace(/\s/g, function(char, index) {
    return (index !== 0 ? '-' : '');
  });
};

@Component({
  selector: 'join-page',
  directives: [NgIf, FORM_DIRECTIVES],
  pipes: [],
  styles: [styles],
  template: template
})
@CanActivate((to, from) => {
  return isLoggedIn(to, from);
})
export class JoinPage extends Page {
  joinData = {
    group: null,
    password: null
  }

  constructor(public User: UserService, public router: Router) {
    super(User);
  }

  joinGroup() {
    if (!this.joinData.group) return false;

    let group = dasherize(this.joinData.group);

    this.User.joinGroup(group, this.joinData.password)
      .then(() => {
        this.router.navigate(['/Group', {group: group}]);
      }, (error) => {
        console.log(error);
      });

  }

}