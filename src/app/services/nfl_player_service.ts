import {Injectable} from 'angular2/angular2';

import {NFLPlayer} from '../models/nfl_player';

@Injectable()
export class NFLPlayerService {
	players : Array<NFLPlayer> = [
		{
			name: 'Tom Brady',
			position: 'QB',
			team: 'NE'
		},
		{
			name: 'Jamaal Charles',
			position: 'RB',
			team: 'KC'
		},
		{
			name: 'Peyton Manning',
			position: 'QB',
			team: 'DEN'
		}
	];

	getPlayers() {
		return this.players;
	}

}