import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../entity/Board';
import {Sprint} from '../../entity/Sprint';
import {BoardService} from '../../service/board/board.service';
import {TicketDto} from '../../entity/TicketDto';
import {List} from '../../entity/List';
import {Ticket} from '../../entity/Ticket';
import {TicketService} from '../../service/ticket/ticket.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SprintService} from '../../service/sprint/sprint.service';
import {a, b} from '@angular/core/src/render3';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent implements OnInit {

  addedSprint: Sprint;

  currentSprint: Sprint;

  ticket: TicketDto;

  addedTicket: Ticket;

  @Input() currentBoard: Board;

  isAddSprintButtonClicked = false;

  isAddNewTicketClicked = false;

  subs = new Subscription();

  constructor(private sprintService: SprintService,
              private boardService: BoardService,
              private ticketService: TicketService,
              private route: ActivatedRoute,
              private dragulaService: DragulaService) {
    dragulaService.createGroup('SPRINTS', {
      revertOnSpill: true,
      direction: 'vertical'
    });
    this.subs.add(dragulaService.drop('SPRINTS')
      .subscribe(({el}) => {
        const sprintId = el.getAttribute('id');
        console.log(sprintId);
        const sequenceNumber = [].slice.call(el.parentElement.children).indexOf(el);
        const boardId = this.currentBoard.id;
        this.sprintService.updateSprintOrder(boardId, sprintId, sequenceNumber);
      })
    );
    dragulaService.createGroup('TICKETSINSPRINT', {
      revertOnSpill: true,
      direction: 'vertical'
    });
    this.subs.add(dragulaService.drop('TICKETSINSPRINT')
      .subscribe(({el, source, target}) => {
        const ticketId = el.getAttribute('id');
        console.log(ticketId);
        const sprintId = target.parentElement.getAttribute('id');
        console.log(target.parentElement.getAttribute('id'));
        this.updateSprintForTicket(ticketId, sprintId);
        this.sprintService.updateSprintForTicket(this.ticket);
      })
    );
  }

  updateSprintForTicket(ticketId: string, sprintId: string) {
    this.getTicket(31);
    console.log(this.ticket);
    // this.ticket.sprintId = parseInt(sprintId, 10);
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

  getBoard(boardId: number) {
    this.boardService.getBoard(boardId).subscribe(board => {
      this.currentBoard = board;
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

  clickAddNewTicket() {
    this.isAddNewTicketClicked
      = (!this.isAddNewTicketClicked);
  }

  addSprintButtonClick() {
    this.isAddSprintButtonClicked = !this.isAddSprintButtonClicked;
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

  noSort() {
    this.getBoard(this.currentBoard.id);
  }

  changeButtonClick() {
    this.isAddSprintButtonClicked = !this.isAddSprintButtonClicked;
  }

  addNewTicket(ticketName: string, sprint: Sprint) {
    this.configureTicket(ticketName, this.currentBoard.tableLists[0]);
    this.boardService.addTicket(this.addedTicket)
      .subscribe(ticket => sprint.ticketsForBoardResponse.push(ticket));
    this.clickAddNewTicket();
    console.log(this.addedTicket);
  }

  configureTicket(ticketName: string, list: List) {
    this.addedTicket = {
      id: null,
      createTime: null,
      updateTime: null,
      name: ticketName,
      priority: null,
      ticketIssueType: null,
      assignedTo: null,
      expirationDate: null,
      tableListId: list.id,
      boardId: this.currentBoard.id,
      createdById: null,
      sprintId: this.currentBoard.backlog.id,
      // todo: add sequence number
      sequenceNumber: null
    };
  }

  editSprint(newName: string, sprint: Sprint) {
    this.sprintService.editSprint(newName, sprint).subscribe();
    this.editSprintClick(sprint);
    console.log(this.currentSprint);
  }

  saveSprint(startDate: string, endDate: string, goal: string, sprint: Sprint) {
    this.sprintService.saveSprint
    (startDate, endDate, goal, sprint).subscribe();
    this.saveSprintClick(sprint);
    console.log(this.currentSprint);
  }

  startSprint(startDate: string, endDate: string, goal: string, sprint: Sprint) {
    this.sprintService.startSprint(startDate, endDate, goal, sprint).subscribe();
    this.getBoard(sprint.boardId);
    console.log(this.currentSprint);
  }

  finishSprint(sprint: Sprint) {
    this.sprintService.finishSprint(sprint).subscribe();
    console.log(this.currentSprint);
  }

  editSprintClick(sprint: Sprint) {
    sprint.isEditSprintClicked = (!sprint.isEditSprintClicked);
  }

  saveSprintClick(sprint: Sprint) {
    sprint.isSaveSprintClicked = (!sprint.isSaveSprintClicked);
  }

  getTicket(ticketId: number) {
    this.ticketService.getTicket(ticketId).subscribe(ticket => {
      this.ticket = ticket;
    });
    console.log(this.ticket, 'GET TICKET');
  }

  moveToArchiveSprint(sprint: Sprint) {
    if (confirm(`Delete sprint ${sprint.label}`)) {
      const number = this.currentBoard.sprints.indexOf(sprint);
      this.sprintService.archiveSprint(sprint).subscribe();
      this.currentBoard.sprints.splice(number, 1);
      console.log(sprint);
    }
  }

  deleteSprint(sprint: Sprint) {
    if (confirm(`Delete sprint ${sprint.label}`)) {
      this.sprintService.deleteSprint(sprint.id).subscribe();
    }
  }

  openForm() {
    document.getElementById('myForms').style.display = 'flex';
    document.getElementById('closeForms').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForms').style.display = 'none';
    document.getElementById('closeForms').style.display = 'none';
  }
}

