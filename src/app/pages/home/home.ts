import {Component} from 'angular2/angular2';

@Component({
  selector: 'home-page',
  directives: [],
  pipes: [],
  styles: ['app/pages/home/home.css'],
  templateUrl: 'app/pages/home/home.html'
})
export class HomePage {
  greeting: string = "Hello from ng2-seed!";

  constructor() {}

}