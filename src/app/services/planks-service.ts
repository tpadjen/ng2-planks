import {Injectable} from 'angular2/angular2';

import {PlankRecord} from '../models/plank-record/plank-record';
import {FirebaseService} from './firebase-service';
import {UserService} from './user-service';

@Injectable()
export class PlanksService {
  public objectives;

  constructor(private FirebaseService: FirebaseService, private User: UserService) {
    this.FirebaseService.plankObjectives.once('value', snapshot => {
      this.objectives = snapshot.val();
    });
  }

  objectiveFor(date) {
    if (!this.objectives) return 0;

    var clone = new Date(date.getTime()).setHours(0,0,0,0);
    return this.objectives[clone];
  }


  getBlankItem(): PlankRecord {
    return new PlankRecord();
  }

  _prepareItem(item: any) {
     delete item.key;
     return this._addUserInfo(item);
  }

  _addUserInfo(item: any): any {
    item.user = {
      name: this.User.profile.name,
      id: this.User.uid
    }
    return item;
  }

  // setObjectives(objectives) {
  //   return new Promise((resolve, reject) => {
  //     this.FirebaseService.plankObjectives.set(objectives, error => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(null);
  //       }
  //     });
  //   });
  // }
}