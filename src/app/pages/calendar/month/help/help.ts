import {Component} from 'angular2/angular2';

import {UserService} from '../../../../services/user-service';

let styles = require('./help.css');

@Component({
  selector: 'help',
  directives: [],
  pipes: [],
  styles: [styles],
  templateUrl: 'app/pages/calendar/month/help/help.html'
})
export class Help {
  instructionsAreVisible = false;
  buttonIsVisible = true;
  beenShown = false;

  constructor(public User: UserService) { }

  afterViewInit() {

    if (this.User.isLoaded()) {
      if (this.User.daysPlanked == 0) {
        this.showInstructions();
      }
    }else {
      this.User.loading.then(() => {
        if (this.User.daysPlanked == 0) {
          this.showInstructions();
        }
      });
    }
  }

  showInstructions() {
    this.beenShown = true;
    this.instructionsAreVisible = true;
    this.buttonIsVisible = false;
  }

  hideInstructions() {
    this.instructionsAreVisible = false;
    setTimeout(() => {
      this.buttonIsVisible = true;
    }, 400)
  }

}