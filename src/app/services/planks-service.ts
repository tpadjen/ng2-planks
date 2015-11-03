import {Injectable} from 'angular2/angular2';

import {PlankRecord} from '../models/plank-record/plank-record';
import {FirebaseService} from './firebase-service';

@Injectable()
export class PlanksService {
  public objectives;

  constructor(private FirebaseService: FirebaseService) {
    this.FirebaseService.plankObjectives.once('value', snapshot => {
      this.objectives = snapshot.val();
    });
  }

  objectiveFor(date) {
    if (!this.objectives) return 0;

    var clone = new Date(date.getTime()).setHours(0,0,0,0);
    return this.objectives[clone];
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