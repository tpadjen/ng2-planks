import {Injectable, Inject} from 'angular2/angular2';

import {FantasyTeamService} from './fantasy_team_service';
import {Pick} from '../models/pick/pick';

@Injectable()
export class PicksService {
	public picks: Array<Pick> = [];
	private _current: number = 1;

	constructor(private fantasyTeamService: FantasyTeamService) {
		this.fantasyTeamService.teams.then((teams) => {
			for (var i = 0; i < teams.length*16; i++) {
				var pick = new Pick(i + 1, this.fantasyTeamService);
				var teamIndex = i % teams.length;
				if (Math.floor(i / teams.length) % 2 == 1) {
					teamIndex = (teams.length - (i - Math.floor(i / teams.length)*teams.length) - 1) % teams.length
				}
				pick.team = teams[teamIndex];
				pick.player = null;
				this.picks.push(pick);
			}
		});
	}

	get currentPickNumber(): number {
		return this._current;
	}



}