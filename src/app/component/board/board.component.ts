import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../entity/Board';
import {List} from '../../entity/List';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../entity/Ticket';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../entity/TicketDto';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  currentBoard: Board;

  addedList: List;

  addedTicket: Ticket;

  ticketDto: TicketDto;

  isAddListButtonClicked = false;

  isEditBoardClicked = false;

  subs = new Subscription();

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private dragulaService: DragulaService,
              private ticketService: TicketService) {
    dragulaService.createGroup('TICKETS', {
      revertOnSpill: true
    });
    this.subs.add(dragulaService.drop('TICKETS')
      .subscribe(({el, source, target}) => {
        const listId = target.parentElement.parentElement.getAttribute('id');
        // do not delete me, I wait drag and drop logic on server
        console.log('ticketId - ' + el.getAttribute('id'));
        console.log('listId - ' + listId.substring(4, listId.length));
        console.log('sequence number - ' + [].slice.call(el.parentElement.children).indexOf(el));
        console.log('boardId - ' + this.currentBoard.id);
      })
    );
  }

  openHistorySidenav() {
    document.getElementById('sidenav-history').style.width = '25%';
  }

  closeNav() {
    document.getElementById('sidenav-history').style.width = '0';
  }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.getRouteBoard();
    }
  }

  getRouteBoard() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBoard(id);
  }

  getTicket(ticketId: number) {
    this.ticketService.openForm();
    this.ticketService.getTicket(ticketId).subscribe(ticket => {
      this.ticketDto = ticket;
    });
  }

  getBoard(id: number) {
    this.boardService.getBoard(id).subscribe(board => {
      this.currentBoard = board;
    });
  }

  addList(listName: string) {
    this.configureList(listName);
    this.boardService.addList(this.currentBoard.id, this.addedList)
      .subscribe(list => this.currentBoard.tableLists.push(list));
    this.isAddListButtonClicked = false;
  }

  configureList(listName: string) {
    this.addedList = {
      id: null,
      name: listName,
      createTime: null,
      updateTime: null,
      sequenceNumber: null,
      boardId: null,
      isEditListNameInProgress: false,
      isAddNewTicketClicked: false,
      ticketsForBoardResponse: []
    };
  }

  changeButtonClick() {
    this.isAddListButtonClicked = !this.isAddListButtonClicked;
  }

  deleteList(list: List) {
    if (confirm(`Delete list ${list.name}`)) {
      const number = this.currentBoard.tableLists.indexOf(list);
      this.boardService.deleteList(list.id).subscribe();
      this.currentBoard.tableLists.splice(number, 1);
    }
  }

  editList(list: List, newName: string) {
    list.name = newName;
    this.boardService.editList(list).subscribe(updatedList =>
      this.currentBoard.tableLists[this.currentBoard.tableLists.indexOf(list)] = updatedList);
    this.setEditableListName(list);
  }

  setEditableListName(list: List) {
    const id = this.currentBoard.tableLists.indexOf(list);
    this.currentBoard.tableLists[id].isEditListNameInProgress
      = (!this.currentBoard.tableLists[id].isEditListNameInProgress);
  }

  editBoard(newName: string) {
    this.currentBoard.name = newName;
    this.boardService.editBoard(newName, this.currentBoard).subscribe();
    this.editBoardClick();
  }

  editBoardClick() {
    this.isEditBoardClicked = (!this.isEditBoardClicked);
  }

  addNewTicket(ticketName: string, list: List) {
    this.configureTicket(ticketName, list);
    const id = this.currentBoard.tableLists.indexOf(list);
    this.boardService.addTicket(this.addedTicket)
      .subscribe(ticket => this.currentBoard.tableLists[id].ticketsForBoardResponse.push(ticket));
    this.clickAddNewTicket(list);
  }

  clickAddNewTicket(list: List) {
    const id = this.currentBoard.tableLists.indexOf(list);
    this.currentBoard.tableLists[id].isAddNewTicketClicked
      = (!this.currentBoard.tableLists[id].isAddNewTicketClicked);
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
      sprintId: null
    };
  }

}
