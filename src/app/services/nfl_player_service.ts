import {Injectable} from 'angular2/angular2';

import {NFLPlayer} from '../models/nfl_player/nfl_player';
import {NFLTeam} from '../models/nfl_team/nfl_team';
import {NFLTeamService} from './nfl_team_service';
import {FakerService} from './faker_service';

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K'];

@Injectable()
export class NFLPlayerService {
	players: Array<NFLPlayer> = [];

	constructor(private nflTeamService: NFLTeamService, private fakerService: FakerService) {
		this._createPlayers();
		this._createDefenses();
		this._shuffleArray(this.players)
	}

	getPlayersOnTeam(team: NFLTeam): Array<NFLPlayer> {
		return this.players.filter(function(player) {
			return player.team === team;
		});
	}

	_randomPlayerPosition(): string {
		var pos = '';
		while (pos == '' || pos == 'DEF') {
			pos = POSITIONS[Math.floor(Math.random() * POSITIONS.length)]
		}
		return pos;
	}

	_shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	_createPlayers() {
		for (var i = 0; i < 168; i++) {
			this.players.push({
				name: this.fakerService.name(),
				position: this._randomPlayerPosition(),
				team: this.nflTeamService.randomTeam()
			})
		}
	}

	_createDefenses() {
		for (var team in this.nflTeamService.teams) {
			this.players.push({
				name: this.nflTeamService.teams[team].mascot,
				position: 'DEF',
				team: this.nflTeamService.teams[team]
			})
		}
	}

}