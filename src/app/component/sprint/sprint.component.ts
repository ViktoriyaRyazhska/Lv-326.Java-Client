import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../models/Board';
import {Sprint} from '../../models/Sprint';
import {BoardService} from '../../service/board/board.service';
import {TicketDto} from '../../models/TicketDto';
import {Ticket} from '../../models/Ticket';
import {TicketService} from '../../service/ticket/ticket.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SprintService} from '../../service/sprint/sprint.service';
import {OrderSprint} from '../../models/OrderSprint';
import {OrderTicket} from '../../models/OrderTicket';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent implements OnInit {

  addedSprint: Sprint;

  currentSprint: Sprint;

  orderSprint: OrderSprint;

  ticket: TicketDto;

  addedTicket: Ticket;

  @Input() currentBoard: Board;

  isAddSprintButtonClicked = false;

  isAddNewTicketClicked = false;

  subs = new Subscription();

  orderTicket: OrderTicket;

  constructor(private sprintService: SprintService,
              private boardService: BoardService,
              private ticketService: TicketService,
              private route: ActivatedRoute,
              private dragulaService: DragulaService) {
    this.dragulaService.createGroup('SPRINTS', {
      direction: 'vertical',
      revertOnSpill: true,
      moves: (el, source, handle) => handle.className === 'handle'
    });
    this.subs.add(dragulaService.drop('SPRINTS')
      .subscribe(({el, target, source}) => {
        const sprintId = Number(el.getAttribute('id').split('sprint')[1]);
        const sequenceNumber = [].slice.call(el.parentElement.children).indexOf(el);
        const boardId = this.currentBoard.id;
        this.updateSprintOrder(boardId, sprintId, sequenceNumber);
        console.log(sprintId, sequenceNumber, boardId);
      })
    );
    dragulaService.createGroup('ITEMS', {
      revertOnSpill: true,
    });
    this.subs.add(dragulaService.drop('ITEMS')
      .subscribe(({el, source, target}) => {
        const ticketId = Number(el.getAttribute('id').split('list')[0]);
        const sprintId = Number(target.parentElement.getAttribute('id').split('sprint')[1]);
        const listId = Number(el.getAttribute('id').split('list')[1]);
        const sequenceNumber = [].slice.call(el.parentElement.children).indexOf(el);
        this.updateTicketForSprint(ticketId, listId, sequenceNumber, sprintId);
        console.log(ticketId, sprintId, sequenceNumber, listId);
      })
    );
  }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.getRouteSprint();
    }
  }

  getRouteSprint() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSprint(id);
  }

  getSprint(sprintId: number) {
    this.sprintService.getSprint(sprintId).subscribe(sprint => {
      this.currentSprint = sprint;
    });
  }

  addSprint(sprintName: string) {
    this.configureSprint(sprintName);
    this.sprintService.addSprint(this.currentBoard.id, this.addedSprint)
      .subscribe(sprint => this.currentBoard.sprints.push(sprint));
    this.isAddSprintButtonClicked = false;
    console.log(this.addedSprint);
  }

  configureSprint(sprintName: string) {
    this.addedSprint = {
      id: null,
      label: sprintName,
      startDate: null,
      endDate: null,
      goal: null,
      boardId: this.currentBoard.id,
      sprintType: null,
      sprintStatus: null,
      sequenceNumber: null,
      isAddSprintClicked: false,
      ticketsForBoardResponse: [],
      isEditSprintClicked: false,
      isSaveSprintClicked: false,
    };
  }

  noSort() {
    this.getBoard(this.currentBoard.id);
  }

  sortFuncByName() {
    this.currentBoard.sprints = this.currentBoard.sprints
      .sort((a, b) => a.label.toLocaleUpperCase().localeCompare(b.label.toLocaleUpperCase()));
  }

  sortFuncByStartDate() {
    this.currentBoard.sprints = this.currentBoard.sprints
      .sort((x, y) => {
        if (x.startDate === null && y.startDate != null) {
          return 1;
        } else if (x.startDate != null && y.startDate === null) {
          return -1;
        } else if (x.startDate === null && y.startDate === null) {
          return 0;
        } else {
          return new Date(x.startDate).getDate() - new Date(y.startDate).getDate();
        }
      });
  }

  editSprint(newName: string, sprint: Sprint) {
    this.sprintService.editSprint(newName, sprint).subscribe();
    this.editSprintClick(sprint);
  }

  saveSprint(startDate: string, endDate: string, goal: string, sprint: Sprint) {
    this.sprintService.saveSprint
    (startDate, endDate, goal, sprint).subscribe();
    this.saveSprintClick(sprint);
  }

  startSprint(startDate: string, endDate: string, goal: string, sprint: Sprint) {
    this.sprintService.startSprint(startDate, endDate, goal, sprint).subscribe();
    this.getBoard(sprint.boardId);
  }

  finishSprint(sprint: Sprint) {
    this.sprintService.finishSprint(sprint).subscribe();
  }

  updateSprintOrder(boardId: number, sprintId: number, sequenceNumber: number) {
    this.configureOrderSprint(boardId, sprintId, sequenceNumber);
    this.sprintService.updateSprintOrder(this.orderSprint);
  }

  configureOrderSprint(boardId, sprintId, sequenceNumber) {
    this.orderSprint = {
      boardId: boardId,
      sequenceNumber: sequenceNumber,
      sprintId: sprintId
    };
  }

  moveToArchiveSprint(sprint: Sprint) {
    if (confirm(`Delete sprint ${sprint.label}`)) {
      const number = this.currentBoard.sprints.indexOf(sprint);
      this.sprintService.archiveSprint(sprint).subscribe();
      this.currentBoard.sprints.splice(number, 1);
    }
  }

  deleteSprint(sprint: Sprint) {
    if (confirm(`Delete sprint ${sprint.label}`)) {
      this.sprintService.deleteSprint(sprint.id).subscribe();
    }
  }

  addSprintButtonClick() {
    this.isAddSprintButtonClicked = !this.isAddSprintButtonClicked;
  }

  changeButtonClick() {
    this.isAddSprintButtonClicked = !this.isAddSprintButtonClicked;
  }

  clickAddNewTicket() {
    this.isAddNewTicketClicked
      = (!this.isAddNewTicketClicked);
  }

  addNewTicket(ticketName: string, sprint: Sprint) {
    const newTicketSequenceNumber = document.getElementById('sprint' + this.currentBoard.backlog.id).children.length;
    this.configureTicket(ticketName, newTicketSequenceNumber);
    this.sprintService.addTicket(this.addedTicket)
      .subscribe(ticket => sprint.ticketsForBoardResponse.push(ticket));
    this.clickAddNewTicket();
    console.log(this.addedTicket);
  }

  configureTicket(ticketName: string, newTicketSequenceNumber: number) {
    this.addedTicket = {
      id: null,
      createTime: null,
      updateTime: null,
      name: ticketName,
      priority: null,
      ticketIssueType: null,
      assignedTo: null,
      expirationDate: null,
      tableListId: null,
      boardId: this.currentBoard.id,
      createdById: null,
      sprintId: this.currentBoard.backlog.id,
      sequenceNumber: newTicketSequenceNumber,
    };
  }

  editSprintClick(sprint: Sprint) {
    sprint.isEditSprintClicked = (!sprint.isEditSprintClicked);
  }

  saveSprintClick(sprint: Sprint) {
    sprint.isSaveSprintClicked = (!sprint.isSaveSprintClicked);
  }

  getTicket(ticketId: number) {
    this.ticketService.openForm();
    this.ticketService.getTicket(ticketId).subscribe(ticket => {
      this.ticket = ticket;
    });
  }

  updateTicketForSprint(ticketId: number, listId: number, sequenceNumber: number, sprintId: number) {
      this.sprintService.updateOrder(ticketId, listId, sequenceNumber, sprintId);
  }

  openForm() {
    document.getElementById('myForms').style.display = 'flex';
    document.getElementById('closeForms').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForms').style.display = 'none';
    document.getElementById('closeForms').style.display = 'none';
  }

  getBoard(boardId: number) {
    this.boardService.getBoard(boardId).subscribe(board => {
      this.currentBoard = board;
    });
  }
}

