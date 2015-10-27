import {Injectable} from 'angular2/angular2';

import {FantasyTeam} from '../models/fantasy_team/fantasy_team';

export class FantasyTeamService {
	_teams: Array<FantasyTeam> = [
		{
			owner: 'Team 1'
		},
		{
			owner: 'Team 2'
		},
		{
			owner: 'Team 3'
		},
		{
			owner: 'Team 4'
		},
		{
			owner: 'Team 5'
		},
		{
			owner: 'Team 6'
		},
		{
			owner: 'Team 7'
		},
		{
			owner: 'Team 8'
		}

	];

	get teams(): Promise<any> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this._teams);
			}, 500);
		});
	}

	size(): number {
		return this._teams.length;
	}
}