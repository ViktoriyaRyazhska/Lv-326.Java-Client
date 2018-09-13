import {Ticket} from './Ticket';

export class Sprint {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
  goal: string;
  boardId: number;
  sprintType: string;
  sprintStatus: string;
  sequenceNumber: number;

  ticketsForBoardResponse: Ticket[];

  isEditSprintClicked = false;
  isAddSprintClicked: false;
  isSaveSprintClicked: boolean;

  diffInDays: number;

  dateOfEnd: string;
}
