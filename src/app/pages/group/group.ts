import {Component, NgIf, NgFor} from 'angular2/angular2';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {AuthenticatedPage} from '../authenticated-page';

import {GroupMember} from '../../models/group-member/group-member';

import {UserService} from '../../services/user-service';
import {MemberService} from '../calendar/member-service';

let styles = require('./group.css');
let template = require('./group.html');

@Component({
  selector: 'group-page',
  directives: [NgIf, NgFor, RouterLink],
  pipes: [],
  styles: [styles],
  template: template,
  providers: [MemberService]
})
export class GroupPage extends AuthenticatedPage {
  group: string;
  groupMembers: GroupMember[] = [];
  loading: boolean = true;

  constructor(
    public User: UserService,
    public router: Router,
    public routeParams: RouteParams,
    private MemberService: MemberService
  ) {
    super(User, router);

    this.group = routeParams.get('group');
  }

  onActivate() {
    if (!super.onActivate()) return false;

    if (!this.User.isMemberOfGroup(this.group)) {
      this.router.navigate(['/Join']);
      return false;
    }

    this._loadGroupMembers();
    return true;
  }

  _loadGroupMembers() {
    if (this.User.hasLoadedGroup(this.group)) {
      this.loading = false;
      this.groupMembers = this.User.groupMembers(this.group);
    } else {
      this.MemberService.getGroupMembers(this.group).then((groupMembers) => {
        this.loading = false;
        this.groupMembers = groupMembers;
        this.User.setGroupMembers(this.group, groupMembers);
      });
    }
  }

}