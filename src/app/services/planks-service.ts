import {Injectable} from 'angular2/angular2';

import {PlankRecord} from '../models/plank-record/plank-record';
import {FirebaseService} from './firebase-service';
import {UserService} from './user-service';

@Injectable()
export class PlanksService {
  public units = [];
  public items = [];

  constructor(private FirebaseService: FirebaseService, private User: UserService) {
    this.FirebaseService.units.change('value', units => {
      this.units = units;
    });
    this.FirebaseService.items.change('value', items => {
      this.items = items;
    });
  }

  addItem(pr: PlankRecord) {
    this.FirebaseService.plankRecords.push(this._prepareItem(pr), error => {
      if (error) console.log(error);
    });
  }

  updateItem(key: string, update: any) {
    this.FirebaseService.plankRecords.child(key).update(this._prepareItem(update), error => {
      if (error) {
        console.log(error);
      }
    });
  }

  removeItem(pr: PlankRecord) {
    this.FirebaseService.items.child(pr.key).remove(error => {
      if (error) {
        console.log(error);
      }
    });
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

}