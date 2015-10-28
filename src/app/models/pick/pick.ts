import {NFLPlayer} from '../nfl_player/nfl_player';
import {FantasyTeam} from '../fantasy_team/fantasy_team';
import {FantasyTeamService} from '../../services/fantasy_team_service';

export class Pick {
  player: NFLPlayer;
  team: FantasyTeam;

  constructor(public number: number, private league: FantasyTeamService) { }

  isPicked(): boolean {
    return this.team != null;
  }

  get round() {
    var r = Math.floor(this.number / this.league.size()) + 1;
    if (this.number % this.league.size() == 0) r = r - 1;
    return r;
  }

  // pick number this round
  get slot() {
    var p = this.number % this.league.size();
    if (p == 0) p = this.league.size();
    return p;
  }

  // "round.slot"
  get spot() {
    return this.round + "." + this.slot;
  }
}