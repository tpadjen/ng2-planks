import {Component} from 'angular2/angular2';

@Component({
  selector: 'help',
  directives: [],
  pipes: [],
  styleUrls: ['app/pages/calendar/month/help/help.css'],
  templateUrl: 'app/pages/calendar/month/help/help.html'
})
export class Help {
  instructionsAreVisible = false;
  buttonIsVisible = true;
  beenShown = false;

  constructor() {}

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