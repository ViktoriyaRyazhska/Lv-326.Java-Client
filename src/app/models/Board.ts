import {List} from './List';
import {HistoryLog} from './HistoryLog';
import {Sprint} from './Sprint';

export class Board {
  id: number;
  name: string;
  boardType: string;
  tableLists: List[];
  logs: HistoryLog[];
  image: any;
  imageName: string;

  sprints: Sprint[];
  backlog: Sprint;
}

