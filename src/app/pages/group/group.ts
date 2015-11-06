import {Component, NgIf, NgFor} from 'angular2/angular2';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {AuthenticatedPage} from '../authenticated-page';

import {GroupMember} from '../../models/group-member/group-member';

import {UserService} from '../../services/user-service';
import {MemberService} from '../calendar/member-service';

let styles = require('./group.css');

@Component({
  selector: 'group-page',
  directives: [NgIf, NgFor, RouterLink],
  pipes: [],
  styles: [styles],
  templateUrl: 'app/pages/group/group.html',
  providers: [MemberService]
})
export class GroupPage extends AuthenticatedPage {
  group: string;
  groupMembers: GroupMember[] = [];

  constructor(
    public User: UserService,
    public router: Router,
    public routeParams: RouteParams,
    private MemberService: MemberService
  ) {
    super(User, router);

    this.group = routeParams.get('group');

    MemberService.getGroupMembers(this.group).then((groupMembers) => {
      this.groupMembers = groupMembers;
    });

  }

}