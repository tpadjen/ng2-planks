import {Injectable} from 'angular2/angular2';

import {NFLTeam} from '../models/nfl_team/nfl_team';
import {FakerService} from './faker_service';

const TEAMS: number = 32;

@Injectable()
export class NFLTeamService {
	teams: Array<NFLTeam> = [];

	constructor(fakerService: FakerService) {
		this.teams = fakerService.uniqueRandomTeams(TEAMS).sort(NFLTeam.alphabetical);
	}

	randomTeam(): NFLTeam {
		return this.teams[Math.floor(Math.random() * this.teams.length)];
	}

	getTeamByMascot(mascot: string) {
		mascot = mascot.toLowerCase();
		return this.teams.find(function(team) { 
			return team.mascot.toLowerCase() === mascot;
		});
	}
}