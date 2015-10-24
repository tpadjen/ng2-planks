import {Injectable} from 'angular2/angular2';

import {NFLTeam} from '../models/nfl_team';

import {Cities} from './fake_data/cities';
import {Mascots} from './fake_data/mascots';
import {FirstNames} from './fake_data/first_names';
import {LastNames} from './fake_data/last_names';

@Injectable()
export class FakerService {

	firstName() {
		return FirstNames[Math.floor(Math.random() * FirstNames.length)];
	}

	lastName() {
		return LastNames[Math.floor(Math.random() * LastNames.length)];
	}

	name() {
		return this.firstName() + " " + this.lastName();
	}

	uniqueRandomTeams(n: number): Array<NFLTeam> {
		var teams: Array<NFLTeam> = [];
		var cities = this.uniqueRandomCities(n);
		var mascots = this.uniqueRandomMascots(n);
		for (var i = 0; i < n; i++) {
			teams.push({
				city: cities[i],
				mascot: mascots[i]
			})
		}
		return teams;
	}

	uniqueRandomCities(n: number): Array<string> {
		return this._shuffleArray(Cities).slice(0, n);
	}

	uniqueRandomMascots(n: number): Array<string> {
		return this._shuffleArray(Mascots).slice(0, n);
	}

	_shuffleArray(arr) {
	    var array = arr.slice(0);
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

  
}