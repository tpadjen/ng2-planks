import {Component} from 'angular2/angular2';

import {UserService} from '../services/user-service';

@Component({
  selector: 'page',
  directives: [],
  pipes: []
})
export class Page {
  hasUser: boolean = false;

  constructor(public User: UserService) {}

  onInit() {
    this.User.waitForLoad().then(() => {
      this.hasUser = true;
    });
  }

}