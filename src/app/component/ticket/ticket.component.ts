import {Component, OnInit, Input} from '@angular/core';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../entity/TicketDto';
import {List} from '../../entity/List';
import {CommentDto} from '../../entity/CommentDto';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  @Input() ticketDto: TicketDto;
  @Input() listForTicket: List;
  comment: CommentDto;

  constructor(private ticketService: TicketService) {
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

  editCommentButton(id: string) {
console.log(id);
    document.getElementById(id).style.display = 'none';
    document.getElementById('editCommentTextArea').style.display = 'flex';
    document.getElementById('commentWrapper').style.display = 'none';
  }

  editComment(comment: CommentDto, newComment: string) {



    const number = this.ticketDto.comments.indexOf(comment);
    this.ticketService.deleteComment(comment.id).subscribe();
    this.ticketDto.comments.splice(number, 1);
    // this.createUpperLog('deleted list with name ' + list.name);
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

  // TODO

  editTicketName(descriptionField: string) {
    this.ticketDto.description = descriptionField;
    this.ticketService.editTicket(this.ticketDto).subscribe();
    document.getElementById('textarea_description_edit_button').style.display = 'none';
    document.getElementById('descriptionWindow').style.display = 'flex';
  }

  editTicketNameButton() {
    document.getElementById('textarea_description_edit_button').style.display = 'flex';
    document.getElementById('descriptionWindow').style.display = 'none';
  }



  // TODO

  editDescriptionButton() {
    document.getElementById('textarea_description_edit_button').style.display = 'flex';
    document.getElementById('descriptionWindow').style.display = 'none';
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
}
