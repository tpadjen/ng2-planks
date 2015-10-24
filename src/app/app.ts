import {Component} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

import {DraftListComponent} from './components/draft/list/list';

import {DraftBoardPage} from './components/pages/draft_board/draft_board';

@RouteConfig([
	{path: '/', component: DraftBoardPage, as: 'Draft'}
])
@Component({
	selector: 'app',
	directives: [DraftListComponent, RouterOutlet, RouterLink],
	template: `
		<nav class="navbar navbar-fixed-top">
			<a [router-link]="['/Draft']" class="navbar-brand">Angular Draft</a>
			<ul class="nav navbar-nav">
				<li class="nav-item">
					<a [router-link]="['/Draft']" class="nav-link">Draft Board</a>
				</li>
			</ul>
		</nav>
		<div class="container-fluid main">
			<div class="row">
				<draft-list class="sidebar"></draft-list>
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	styleUrls: ['app/app.css']
})
export class AppComponent {}