import {TimedRecord} from '../timed-record/timed-record';
import {ObjectivesService} from '../../services/objectives-service';

export class GroupMember {
  id: string;
  // plankRecords: PlankRecord[] = [];
  loadingRecords: boolean = false;

  constructor(
    public uid: string,
    public group: string,
    public name,
    public records: TimedRecord[],
    private ObjectivesService: ObjectivesService
  ) {
    this.id = this.uid.replace("google:", "");
  }

  get daysSucceeded() {
    return this.records ? Object.keys(this.records).length : 0;
  }

  succeededOn(datetime) {
    return this.records && this.records[parseInt(datetime)];
  }

  timeFor(datetime): number {
    if (!this.records) return 0;

    console.log(this.records[parseInt(datetime)]);

    return 0;
  }

  get time() {
    if (this.daysSucceeded == 0) return 0;

    return Object.keys(this.records).map(datetime => {
      return this.records[datetime];
      // return this.PlanksService.objectiveFor(new Date(parseInt(datetime)));
    }).reduce((a, b) => { return a + b; });
  }

  static ranking(a: GroupMember, b: GroupMember): number {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    if (a.daysSucceeded > b.daysSucceeded) return -1;
    if (a.daysSucceeded < b.daysSucceeded) return 1;
    return 0;
  }

}