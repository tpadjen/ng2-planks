import {Component, bootstrap} from 'angular2/angular2';

@Component({
	selector: 'app',
	template: `
		<h1>My first Angular 2 App</h1>
	`
})
export class AppComponent {}

bootstrap(AppComponent);