import {Component} from 'angular2/angular2';

import {UserService} from '../../../../services/user-service';

let styles = require('./help.css');
let template = require('./help.html');

@Component({
  selector: 'help',
  directives: [],
  pipes: [],
  styles: [styles],
  template: template
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