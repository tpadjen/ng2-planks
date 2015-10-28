import {bootstrap, provide} from 'angular2/angular2';

import {FantasyTeamService} from './services/fantasy_team_service';
import {PicksService} from './services/picks_service';
import {NFLPlayerService} from './services/nfl_player_service';
import {NFLTeamService} from './services/nfl_team_service';
import {FakerService} from './services/faker_service';

import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import {AppComponent} from './app'

bootstrap(AppComponent, [
    FantasyTeamService,
    PicksService,
    NFLPlayerService,
    NFLTeamService,
    FakerService,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]
);