import {Component, OnInit, Input, Injectable} from '@angular/core';
import {Ticket} from '../../entity/Ticket';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../entity/TicketDto';
import {List} from '../../entity/List';

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

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
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
