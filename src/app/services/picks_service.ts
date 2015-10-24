import {Injectable, Inject} from 'angular2/angular2';

import {FantasyTeamService} from './fantasy_team_service';
import {Pick} from '../models/pick';

@Injectable()
export class PicksService {
	public picks: Array<Pick> = [];
	private _current: number = 1;

	constructor(private fantasyTeamService: FantasyTeamService) {
		var size = this.fantasyTeamService.size();
		for (var i = 0; i < size*16; i++) {
			var pick = new Pick();
			var teamIndex = i % size;
			if (Math.floor(i / size) % 2 == 1) {
				teamIndex = (size - (i - Math.floor(i / size)*size) - 1) % size
			}
			pick.team = this.fantasyTeamService.teams[teamIndex];
			pick.player = null;
			pick.number = i + 1
			pick.league = this.fantasyTeamService;
			this.picks.push(pick);
		}
	}

	get currentPickNumber(): number {
		return this._current;
	}



}