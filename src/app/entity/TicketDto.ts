import {CommentDto} from './CommentDto';

export class TicketDto {
  id: number;
  status: string;
  createTime: string;
  updateTime: string;
  description: string;
  expirationDate: string;
  name: string;
  ticketPriority: string;
  assignedToId: number;
  createdById: number;
  assignedToName: string;
  createdByName: string;
  boardId: number;
  sprintId: number;
  tableListId: number;
  parentTicketId: number;
  comments: CommentDto[];
}
