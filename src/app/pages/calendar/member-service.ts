import {Injectable} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {GroupMember} from '../../models/group-member/group-member';

import {FirebaseService} from '../../services/firebase-service';
import {UserService} from '../../services/user-service';
import {PlanksService} from '../../services/planks-service';

@Injectable()
export class MemberService {
  member;

  constructor(
    private FirebaseService: FirebaseService,
    private Planks: PlanksService,
    private router: Router,
    private routeParams: RouteParams,
    private User: UserService
  ) {}

  loadFromID(id, watch = false) {
    let uid = "google:" + id;
    Promise.all([this.getMember(uid), this.getPlankRecords(uid)]).then(([member, pr]) => {
      this.member = new GroupMember(uid, "", member['name'], pr, this.Planks);
      if (watch) {
        this._watchMember()
      }
    });
  }

  _watchMember() {
    this.FirebaseService
      .plankRecords
        .child(this.member.uid)
        .on('value', snapshot => {
          this.member.plankRecords = snapshot.val();
        });
  }

  getGroupMembers(group): Promise<GroupMember[]> {
    return new Promise((resolve, reject) => {
      this.FirebaseService
        .groups
        .child(group)
        .child('users')
        .once('value', snapshot => {
          var memberIds = Object.keys(snapshot.val());
          var gettingMembers = Promise.all(memberIds.map(uid => { return this.getMember(uid); }))
            // .then(members => { this.members = members; console.log(members); });
          var gettingPRs = Promise.all(memberIds.map(uid => { return this.getPlankRecords(uid); }))
            // .then(prs => { console.log(prs); });
          Promise.all([gettingMembers, gettingPRs]).then(([members, prs]) => {
            let groupMembers = members.map((member, index) => {
              return new GroupMember(memberIds[index], group, member['name'], prs[index], this.Planks);
            });
            groupMembers.sort(GroupMember.ranking);
            resolve(groupMembers);
          });
        }, error => {
          console.log(error);
          this.router.navigate(['/Member', {id: this.User.id}]);
        });
    });
  }

  getMember(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService
        .users
        .child(uid)
        .once('value', snapshot => {
          resolve(snapshot.val());
        }, error => {
          console.log(error);
        });
    });
  }

  getPlankRecords(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService
        .plankRecords
        .child(uid)
        .once('value', snapshot => {
          resolve(snapshot.val());
        }, error => {
          console.log(error);
        });
    });
  }

  get plankRecords() {
    return this.member ? this.member.plankRecords : null;
  }


  plankedOn(datetime: string) {
    return this.plankRecords && this.plankRecords[datetime];
  }

  loadingPlankRecords() {
    return this.member ? this.member.loadingPlankRecords : true;
  }

  get daysPlanked() {
    return this.member ? this.member.daysPlanked : 0;
  }

  get timePlanked(): number {
    return this.member ? this.member.timePlanked : 0
  }

  get name() {
    return this.member ? this.member.name : null;
  }


}