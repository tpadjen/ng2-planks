import {Component, NgIf} from 'angular2/angular2';
import {RouteParams, CanActivate} from 'angular2/router';

import {MinutesPipe} from '../../pipes/minutes';

import {Page} from '../page';
import {Authorize} from '../auth';

import {Month} from './month/month';

// import {GroupMember} from '../../models/group-member/group-member';

import {UserService} from '../../services/user-service';
import {MemberService} from './member-service';

let styles = require('./calendar.css');
let template = require('./calendar.html');

@Authorize()
@Component({
  selector: 'calendar-page',
  directives: [NgIf, Month],
  pipes: [MinutesPipe],
  styles: [styles],
  template: template,
  providers: [MemberService]
})
export class CalendarPage extends Page {
  loading: boolean = true;
  member;

  constructor(
    public User: UserService,
    public routeParams: RouteParams,
    public MemberService: MemberService
  ) {
    super(User);

    let id = routeParams.get('id')

    if (id == this.User.id) {
      this.member = this.User;
    } else {
      this.MemberService.loadFromID(id, true);
      this.member = this.MemberService;
    }
  }

  isUserPage() {
    return this.member == this.User;
  }

  afterViewInit() {
    this.loading = false;
  }

}