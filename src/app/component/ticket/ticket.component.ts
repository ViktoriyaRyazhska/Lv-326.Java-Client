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

  editCommentButton(id: number) {
    console.log(id);
    document.getElementById(`commentTextArea` + id).style.display = 'flex';
    document.getElementById(`commentWrapper` + id).style.display = 'none';
  }

  editComment(comment: CommentDto, newComment: string) {
    this.comment = comment;
    this.comment.message = newComment;
    this.ticketService.editComment(this.comment).subscribe();
    document.getElementById(`commentTextArea` + comment.id).style.display = 'none';
    document.getElementById(`commentWrapper` + comment.id).style.display = 'flex';
  }

  deleteComment(comment: CommentDto) {
    const number = this.ticketDto.comments.indexOf(comment);
    this.ticketService.deleteComment(comment.id).subscribe();
    this.ticketDto.comments.splice(number, 1);
    // this.createUpperLog('deleted list with name ' + list.name);
  }

  archiveTicket(ticket: TicketDto) {
    const name = this.ticketDto.name;
    if (confirm(`Archive ticket "` + name + '"?')) {
      // const number = this.currentBoard.tableLists.indexOf(list);
      // const number = ticket.id;
      this.ticketService.archiveTicket(ticket.id).subscribe();
      // this.currentBoard.tableLists.splice(number, 1);
      // this.createUpperLog('deleted list with name ' + list.name);
    }
  }

  closeForm() {
    this.ticketService.closeForm();
  }

  editDescription(descriptionField: string) {
    this.ticketDto.description = descriptionField;
    this.ticketService.editDescription(this.ticketDto).subscribe();
    document.getElementById('textarea_description_edit_button').style.display = 'none';
    document.getElementById('descriptionWindow').style.display = 'flex';
  }

  // TODO

  editTicketName(nameField: string) {
    this.ticketDto.name = nameField;
    this.ticketService.editTicketName(this.ticketDto).subscribe();
    document.getElementById('editNameForm').style.display = 'none';
    document.getElementById('window_top_one_1').style.display = 'flex';
    document.getElementById('editNameForm1').style.display = 'none';
  }

  editTicketNameButton() {
    document.getElementById('window_top_one_1').style.display = 'none';
    document.getElementById('editNameForm').style.display = 'flex';
    document.getElementById('editNameForm1').style.display = 'flex';
  }

  setPriorityLow(ticketDto: TicketDto) {
    this.ticketDto.ticketPriority = 'LOW';
    this.ticketService.setPriorityLow(ticketDto).subscribe();
  }

  setPriorityMedium(ticketDto: TicketDto) {
    this.ticketDto.ticketPriority = 'MEDIUM';
    this.ticketService.setPriorityMedium(ticketDto).subscribe();
  }

  setPriorityHigh(ticketDto: TicketDto) {
    this.ticketDto.ticketPriority = 'HIGH';
    this.ticketService.setPriorityHigh(ticketDto).subscribe();
  }

  setTicketIssueTypeBug(ticketDto) {
    this.ticketDto.ticketIssueType = 'BUG';
    this.ticketService.setTicketIssueTypeBug(ticketDto).subscribe();
  }

  setTicketIssueTypeTask(ticketDto) {
    this.ticketDto.ticketIssueType = 'TASK';
    this.ticketService.setTicketIssueTypeTask(ticketDto).subscribe();
  }

  setTicketIssueTypeStory(ticketDto) {
    this.ticketDto.ticketIssueType = 'STORY';
    this.ticketService.setTicketIssueTypeStory(ticketDto).subscribe();
  }

  setTicketIssueTypeEpic(ticketDto) {
    this.ticketDto.ticketIssueType = 'EPIC';
    this.ticketService.setTicketIssueTypeEpic(ticketDto).subscribe();
  }

  setTicketEstimationXS(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'XS';
    this.ticketService.setTicketEstimationXS(ticketDto).subscribe();
  }

  setTicketEstimationS(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'S';
    this.ticketService.setTicketEstimationS(ticketDto).subscribe();
  }

  setTicketEstimationM(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'M';
    this.ticketService.setTicketEstimationM(ticketDto).subscribe();
  }

  setTicketEstimationL(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'L';
    this.ticketService.setTicketEstimationL(ticketDto).subscribe();
  }

  setTicketEstimationXL(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'XL';
    this.ticketService.setTicketEstimationXL(ticketDto).subscribe();
  }

  setTicketEstimationXXL(ticketDto: TicketDto) {
    this.ticketDto.estimation = 'XXL';
    this.ticketService.setTicketEstimationXXL(ticketDto).subscribe();
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
