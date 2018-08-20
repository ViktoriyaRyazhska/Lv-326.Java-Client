import {Component, OnInit, Input, Injectable} from '@angular/core';
import {Ticket} from '../../entity/Ticket';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../entity/TicketDto';
import {List} from '../../entity/List';
import {Board} from '../../entity/Board';
import {CommentDto} from '../../entity/CommentDto';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class TicketComponent implements OnInit {
  @Input() ticketDto: TicketDto;
  @Input() currentBoard: Board;
  @Input() currentList: List;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
  }

  deleteComment(comment: CommentDto) {
    const number = this.ticketDto.comments.indexOf(comment);
    this.ticketService.deleteComment(comment.id).subscribe();
    this.ticketDto.comments.splice(number, 1);
    // this.createUpperLog('deleted list with name ' + list.name);
  }

  deleteTicket(ticket: TicketDto) {
    if (confirm(`Delete ticket ${ticket.name}`)) {
      // const number = this.currentBoard.tableLists.indexOf(list);
      const number = ticket.id;
      this.ticketService.deleteTicket(ticket).subscribe();
      this.currentBoard.tableLists.splice(number, 1);
      // this.createUpperLog('deleted list with name ' + list.name);
    }
  }

  closeForm() {
    this.ticketService.closeForm();
  }

}

// addComment(listName: string) {
//   this.configureComment(listName);
//   this.ticketService.addComment(this.currentBoard.id, this.addedList)
//     .subscribe(list => this.currentBoard.tableLists.push(list));
//   this.isAddListButtonClicked = false;
// }
//
// configureComment(ticketName: string, list: List) {
//   this.addedComment = {
//     id: number;
//   message: string;
//   userId: number;
//   commentStatus: string;
//   ticketId: number;
//   createTime: string;
//   updateTime: string;
// };
// }}
