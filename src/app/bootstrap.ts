///<reference path="typings/webpack.d.ts" />
import {bootstrap, provide} from 'angular2/angular2';

import {UserService} from './services/user-service';
import {FirebaseService} from './services/firebase-service';
import {PlanksService} from './services/planks-service';

import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import {AppComponent} from './app'

bootstrap(AppComponent, [
    UserService,
    FirebaseService,
    PlanksService,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]
);