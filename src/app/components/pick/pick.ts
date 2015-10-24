import {Component, CORE_DIRECTIVES, Input} from 'angular2/angular2';

import {Pick} from '../../models/pick';

@Component({
	selector: 'pick',
	directives: [CORE_DIRECTIVES],
	templateUrl: 'app/components/pick/pick.html'
})
export class PickComponent {
	@Input() pick: Pick;
}