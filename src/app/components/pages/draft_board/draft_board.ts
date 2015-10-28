import {Component} from 'angular2/angular2';

import {DraftBoardComponent} from '../../draft/board/board';

@Component({
  selector: 'draft-board-page',
  directives: [DraftBoardComponent],
  templateUrl: 'app/components/pages/draft_board/draft_board.html'
})
export class DraftBoardPage { }