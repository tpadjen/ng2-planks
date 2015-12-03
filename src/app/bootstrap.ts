///<reference path="typings/webpack.d.ts" />
import {bootstrap, provide} from 'angular2/angular2';

import {UserService} from './services/user-service';
import {FirebaseService} from './services/firebase-service';
import {ObjectivesService} from './services/objectives-service';

import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import {AppComponent} from './app'
import {appInjector} from './app-injector';

bootstrap(AppComponent, [
    UserService,
    FirebaseService,
    ObjectivesService,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]
).then((appRef) => {
  appInjector(appRef.injector);
});