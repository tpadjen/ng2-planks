import {Injectable} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {GroupMember} from '../../models/group-member/group-member';

import {FirebaseService} from '../../services/firebase-service';
import {UserService} from '../../services/user-service';
import {ObjectivesService} from '../../services/objectives-service';

@Injectable()
export class MemberService {
  member;
  _loadPromise: Promise<any> = Promise.resolve(null);

  constructor(
    private FirebaseService: FirebaseService,
    private Objectives: ObjectivesService,
    private router: Router,
    private routeParams: RouteParams,
    private User: UserService
  ) {}

  loadFromID(id, watch = false) {
    let uid = "google:" + id;
    this._loadPromise = Promise.all([
      this.getMember(uid),
      this.getRecords(uid)
    ]).then(([member, pr]) => {
      this.member = new GroupMember(uid, "", member['name'], pr, this.Objectives);
      if (watch) {
        this._watchMember()
      }
    });
  }

  waitForLoad() {
    return this._loadPromise;
  }

  _watchMember() {
    this.FirebaseService
      .records
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
          var gettingPRs = Promise.all(memberIds.map(uid => { return this.getRecords(uid); }))
            // .then(prs => { console.log(prs); });
          Promise.all([gettingMembers, gettingPRs]).then(([members, prs]) => {
            let groupMembers = members.map((member, index) => {
              return new GroupMember(
                          memberIds[index],
                          group,
                          member['name'],
                          prs[index],
                          this.Objectives);
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

  getRecords(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FirebaseService
        .records
        .child(uid)
        .once('value', snapshot => {
          resolve(snapshot.val());
        }, error => {
          console.log(error);
        });
    });
  }

  get records() {
    return this.member ? this.member.records : null;
  }


  succeededOn(datetime: string) {
    return this.records && datetime in this.records;
  }

  timeFor(datetime: string) {
    return this.records && this.records[datetime];
  }

  loadingRecords() {
    return this.member ? this.member.loadingRecords : false;
  }

  get daysSucceeded() {
    return this.member ? this.member.daysSucceeded : 0;
  }

  get timeSucceeded(): number {
    return this.member ? this.member.timeSucceeded : 0
  }

  get name() {
    return this.member ? this.member.name : null;
  }


}