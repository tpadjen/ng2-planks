import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {NFLPlayer} from '../../../models/nfl_player';
import {NFLPlayerService} from '../../../services/nfl_player_service';

@Component({
	selector: 'draft-board',
	directives: [CORE_DIRECTIVES],
	templateUrl: 'app/components/draft/board/board.html'
})
export class DraftBoardComponent {

	constructor(private nflPlayerService: NFLPlayerService) {}

	get players(): Array<NFLPlayer> {
		return this.nflPlayerService.players;
	}

}