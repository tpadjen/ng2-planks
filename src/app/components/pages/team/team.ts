import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouterLink, RouteParams} from 'angular2/router';

import {NFLTeam} from '../../../models/nfl_team';
import {NFLPlayer} from '../../../models/nfl_player';
import {NFLTeamService} from '../../../services/nfl_team_service';
import {NFLPlayerService} from '../../../services/nfl_player_service';

@Component({
	selector: 'team-page',
	directives: [CORE_DIRECTIVES, RouterLink],
	templateUrl: 'app/components/pages/team/team.html'
})
export class TeamPage {
	team: NFLTeam;
	players: Array<NFLPlayer>;

	constructor(private nflTeamService: NFLTeamService, 
				private nflPlayerService: NFLPlayerService, 
				params: RouteParams) 
	{ 
		this.team = this.nflTeamService.getTeamByMascot(params.get('mascot'));
		this.players = this.nflPlayerService.getPlayersOnTeam(this.team);
	}
}