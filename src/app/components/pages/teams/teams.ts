import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {NFLTeamService} from '../../../services/nfl_team_service';

@Component({
  selector: 'teams-page',
  directives: [CORE_DIRECTIVES, RouterLink],
  templateUrl: 'app/components/pages/teams/teams.html',
  styleUrls: ['app/components/pages/teams/teams.css']
})
export class TeamsPage {

  constructor(private nflTeamService: NFLTeamService) { }

  get teams() {
    return this.nflTeamService.teams;
  }
}