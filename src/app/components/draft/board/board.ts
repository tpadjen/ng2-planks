import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

// import {Pick} from '../../../models/pick';
// import {PickComponent} from '../../pick/pick';
// import {PicksService} from '../../../services/picks_service'
// import {FantasyTeamService} from '../../../services/fantasy_team_service'

@Component({
	selector: 'draft-board',
	directives: [CORE_DIRECTIVES],
	templateUrl: 'app/components/draft/board/board.html'
})
export class DraftBoardComponent {

	constructor() {}

}