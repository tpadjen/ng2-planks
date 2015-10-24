import {Component, bootstrap} from 'angular2/angular2';

import {DraftListComponent} from './components/draft_list/draft_list';

import {FantasyTeamService} from './services/fantasy_team_service';
import {PicksService} from './services/picks_service';
import {NFLPlayerService} from './services/nfl_player_service';

@Component({
	selector: 'app',
	directives: [DraftListComponent],
	template: `
		<h1>My first Angular 2 App</h1>
		<draft-list></draft-list>
	`
})
export class AppComponent {}

bootstrap(AppComponent, [
		FantasyTeamService,
		PicksService,
		NFLPlayerService
	]
);