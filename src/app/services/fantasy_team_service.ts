import {Injectable} from 'angular2/angular2';

import {FantasyTeam} from '../models/fantasy_team';

export class FantasyTeamService {
	public teams: Array<FantasyTeam> = [
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

	size(): number {
		return this.teams.length;
	}
}