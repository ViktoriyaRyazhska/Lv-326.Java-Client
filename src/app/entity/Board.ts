import {List} from './List';
import {HistoryLog} from './HistoryLog';

export class Board {
  id: number;
  name: string;
  boardType: string;
  tableLists: List[];
  logs: HistoryLog[];
  image: any;
}
