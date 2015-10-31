import {bootstrap, provide} from 'angular2/angular2';

import {GroceryService} from './services/grocery-service';

import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import {AppComponent} from './app'

bootstrap(AppComponent, [
    GroceryService,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]
);