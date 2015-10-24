import {Component, CORE_DIRECTIVES, Input} from 'angular2/angular2';

import {Pick} from '../../models/pick';
import {PicksService} from '../../services/picks_service';

@Component({
	selector: 'pick',
	directives: [CORE_DIRECTIVES],
	templateUrl: 'app/components/pick/pick.html',
	styleUrls: ['app/components/pick/pick.css']
})
export class PickComponent {
	@Input() pick: Pick;

	constructor(private picksService: PicksService) {

	}

	isCurrent():boolean {
		return this.picksService.currentPickNumber == this.pick.number;
	}
}