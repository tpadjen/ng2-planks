import {Injectable} from 'angular2/angular2';

import {NFLTeam} from '../models/nfl_team';
import {FakerService} from './faker_service';

const TEAMS: number = 32;

@Injectable()
export class NFLTeamService {
	teams: Array<NFLTeam> = [];

	constructor(fakerService: FakerService) {
		this.teams = fakerService.uniqueRandomTeams(TEAMS);
	}

	randomTeam(): NFLTeam {
		return this.teams[Math.floor(Math.random() * this.teams.length)];
	}
}