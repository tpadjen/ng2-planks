import {Component, NgIf, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {UserService} from '../../services/user-service';

@Component({
  selector: 'navbar',
  directives: [RouterLink, NgIf, NgFor],
  pipes: [],
  styleUrls: ['app/components/navbar/navbar.css'],
  templateUrl: 'app/components/navbar/navbar.html'
})
export class Navbar {

  constructor(public User: UserService) {}

}