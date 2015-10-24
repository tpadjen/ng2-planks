import {Component} from 'angular2/angular2';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {DraftListComponent} from './components/draft/list/list';

import {DraftBoardPage} from './components/pages/draft_board/draft_board';

@RouteConfig([
	{path: '/', component: DraftBoardPage, as: 'Draft'}
])
@Component({
	selector: 'app',
	directives: [DraftListComponent, RouterOutlet],
	template: `
		<h1>My first Angular 2 App</h1>
		<draft-list></draft-list>
		<router-outlet></router-outlet>
	`
})
export class AppComponent {}