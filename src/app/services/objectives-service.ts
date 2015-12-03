import {Injectable} from 'angular2/angular2';

import {TimedRecord} from '../models/timed-record/timed-record';
import {FirebaseService} from './firebase-service';

@Injectable()
export class ObjectivesService {
  public objectives;
  private _loadPromise: Promise<any> = Promise.resolve();

  constructor(private FirebaseService: FirebaseService) {}

  loadObjectives() {
    if (this.objectives) return;

    this._loadPromise = new Promise((resolve, reject) => {
      this.FirebaseService.objectives.once('value', snapshot => {
        this.objectives = snapshot.val();
        resolve(null);
      });
    });
  }

  waitForLoad(): Promise<any> {
    return this._loadPromise;
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