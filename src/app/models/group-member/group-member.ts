import {PlankRecord} from '../plank-record/plank-record';
import {PlanksService} from '../../services/planks-service';

export class GroupMember {
  id: string;
  // plankRecords: PlankRecord[] = [];
  loadingPlankRecords: boolean = false;

  constructor(
    public uid: string,
    public group: string,
    public name,
    public plankRecords: PlankRecord[],
    private PlanksService: PlanksService
  ) {
    this.id = this.uid.replace("google:", "");
  }

  get daysPlanked() {
    return this.plankRecords ? Object.keys(this.plankRecords).length : 0;
  }

  plankedOn(datetime) {
    return this.plankRecords && this.plankRecords[parseInt(datetime)];
  }

  get timePlanked() {
    if (this.daysPlanked == 0) return 0;

    return Object.keys(this.plankRecords).map(datetime => {
      return this.plankRecords[datetime];
      // return this.PlanksService.objectiveFor(new Date(parseInt(datetime)));
    }).reduce((a, b) => { return a + b; });
  }

  static ranking(a: GroupMember, b: GroupMember): number {
    if (a.timePlanked > b.timePlanked) return -1;
    if (a.timePlanked < b.timePlanked) return 1;
    if (a.daysPlanked > b.daysPlanked) return -1;
    if (a.daysPlanked < b.daysPlanked) return 1;
    return 0;
  }

}