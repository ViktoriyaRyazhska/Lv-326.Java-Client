import {Component, OnInit, Input, Injectable} from '@angular/core';
import {Ticket} from '../../entity/Ticket';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../entity/TicketDto';
import {List} from '../../entity/List';

import {Board} from '../../entity/Board';
import {CommentDto} from '../../entity/CommentDto';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  @Input() ticketDto: TicketDto;
  // @Input() currentBoard: Board;
  // @Input() currentList: List;
  @Input() listForTicket: List;
  comment: CommentDto;

  constructor(private ticketService: TicketService) {
    // this.listForTicket = this.boardComponent.listForTicket;
  }

  ngOnInit() {
  }

  saveComment(commentMessage: string) {
    this.configureComment(commentMessage, this.ticketDto);

    const id = this.ticketDto.comments.indexOf(this.comment);
    this.ticketService.saveComment(this.comment).subscribe(comment => this.ticketDto.comments.push(comment));
    // this.clickAddNewTicket(list);
    // this.createUpperLog('created ticket ' + ticketName);
  }

  configureComment(commentMessage: string, ticketDto: TicketDto) {
    this.comment = {
      id: null,
      message: commentMessage,
      userId: null,
      userName: null,
      commentStatus: null,
      ticketId: ticketDto.id,
      createTime: null,
      updateTime: null
    };
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
      // const number = ticket.id;
      this.ticketService.deleteTicket(ticket).subscribe();
      // this.currentBoard.tableLists.splice(number, 1);
      // this.createUpperLog('deleted list with name ' + list.name);
    }
  }

  closeForm() {
    this.ticketService.closeForm();
  }

  saveDescription(descriptionField: string) {
    this.ticketDto.description = descriptionField;
    this.ticketService.editTicket(this.ticketDto).subscribe();
    document.getElementById('textarea_description_edit_button').style.display = 'none';
    document.getElementById('descriptionWindow').style.display = 'flex';
  }

  editDescriptionButton() {
    document.getElementById('textarea_description_edit_button').style.display = 'flex';
    document.getElementById('descriptionWindow').style.display = 'none';
  }

  // editList(list: List, newName: string) {
  //   list.name = newName;
  //   this.boardService.editList(list).subscribe(updatedList =>
  //     this.currentBoard.tableLists[this.currentBoard.tableLists.indexOf(list)] = updatedList);
  //   this.setEditableListName(list);
  //   this.createUpperLog('changed list name to ' + newName);
  // }

  // setEditableListName(list: List) {
  //   const id = this.currentBoard.tableLists.indexOf(list);
  //   this.currentBoard.tableLists[id].isEditListNameInProgress
  //     = (!this.currentBoard.tableLists[id].isEditListNameInProgress);
  // }

// addComment(listName: string) {
//   this.configureComment(listName);
//   this.ticketService.addComment(this.currentBoard.id, this.addedList)
//     .subscribe(list => this.currentBoard.tableLists.push(list));
//   this.isAddListButtonClicked = false;
// }
}
