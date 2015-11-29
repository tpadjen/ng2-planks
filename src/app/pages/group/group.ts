import {Component, NgIf, NgFor} from 'angular2/angular2';
import {Router, RouteParams, RouterLink, CanActivate} from 'angular2/router';
import {appInjector} from '../../app-injector';
import {Authorize} from '../auth';

import {Page} from '../page';
import {GroupMember} from '../../models/group-member/group-member';

import {UserService} from '../../services/user-service';
import {MemberService} from '../calendar/member-service';

import {MinutesPipe} from '../../pipes/minutes';

let styles = require('./group.css');
let template = require('./group.html');

@Authorize() // make sure logged in
@Component({
  selector: 'group-page',
  directives: [NgIf, NgFor, RouterLink],
  pipes: [MinutesPipe],
  styles: [styles],
  template: template,
  providers: [MemberService]
})
@CanActivate((to, from) => { // then check if member of this group
  let injector = appInjector();
  let User = injector.get(UserService);
  let router = injector.get(Router);

  return User.waitForLoad().then(() => {
    if (!User.isMemberOfGroup(to.params['group'])) {
      router.navigate(['/Join']);
      return false;
    }

    return true;
  });
})
export class GroupPage extends Page {
  group: string;
  groupMembers: GroupMember[] = [];
  loading: boolean = true;

  constructor(
    public User: UserService,
    public router: Router,
    public routeParams: RouteParams,
    private MemberService: MemberService
  ) {
    super(User);
    this.group = routeParams.get('group');
    this._loadGroupMembers();
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