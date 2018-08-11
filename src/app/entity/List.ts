import {Ticket} from './Ticket';

export class List {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  sequenceNumber: number;
  boardId: number;

  ticketsForBoardResponse: Ticket[];

  // dont ask why
  isEditListNameInProgress = false;
  isAddNewTicketClicked = false;

  constructor() {
  }

}
