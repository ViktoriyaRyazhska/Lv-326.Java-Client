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
import {HistoryLog} from '../../entity/HistoryLog';
import {TicketComponent} from '../ticket/ticket.component';
// import * as url from 'url';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  currentBoard: Board;

  addedList: List;

  listForTicket: List;

  addedTicket: Ticket;

  addedLog: HistoryLog;

  ticketDto: TicketDto;

  isAddListButtonClicked = false;

  isEditBoardClicked = false;

  isChangeBackgroundButtonClicked = false;

  subs = new Subscription();

  image: any;

  confirmedImage: any;

  confirmedImageName: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private dragulaService: DragulaService,
              private ticketService: TicketService) {
    dragulaService.createGroup('TICKETS', {
      revertOnSpill: true,
      direction: 'vertical'
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
    this.dragulaService.createGroup('LISTS', {
      direction: 'horizontal'
    });
    this.subs.add(dragulaService.drop('LISTS')
      .subscribe(({el, source, target}) => {
        const listId = el.getAttribute('id');
        const sequenceNumber = [].slice.call(el.parentElement.children).indexOf(el);
        const boardId = this.currentBoard.id;
        this.boardService.updateListOrder(boardId, listId, sequenceNumber);
      })
    );
  }

  openHistorySidenav() {
    document.getElementById('sidenav-history').style.width = '25%';
  }

  closeNav() {
    document.getElementById('sidenav-history').style.width = '0';
  }

  closeBackgroundNav() {
    document.getElementById('sidenav-background-image').style.width = '0';
    this.changeIsChangeBackgroundButtonClicked();
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

  closeForm() {
    this.ticketService.closeForm();
  }

  getTicket(ticketId: number, list: List) {
    this.listForTicket = list;
    this.ticketService.openForm();
    this.ticketService.getTicket(ticketId).subscribe(ticket => {
      this.ticketDto = ticket;
    });
  }

  getBoard(id: number) {
    this.boardService.getBoard(id).subscribe(board => {
      this.currentBoard = board;
      this.confirmedImage = (board.image) ? board.image : '';
    });
  }

  addList(listName: string) {
    this.configureList(listName);
    this.boardService.addList(this.currentBoard.id, this.addedList)
      .subscribe(list => this.currentBoard.tableLists.push(list));
    this.isAddListButtonClicked = false;
    this.createUpperLog('created list with name ' + listName);
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
      this.createUpperLog('deleted list with name ' + list.name);
    }
  }

  editList(list: List, newName: string) {
    list.name = newName;
    this.boardService.editList(list).subscribe(updatedList =>
      this.currentBoard.tableLists[this.currentBoard.tableLists.indexOf(list)] = updatedList);
    this.setEditableListName(list);
    this.createUpperLog('changed list name to ' + newName);
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
    this.createUpperLog('changed board name to ' + newName);
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
    this.createUpperLog('created ticket ' + ticketName);
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

  createUpperLog(message: string) {
    this.configureLog(message);
    this.boardService.createLog(this.addedLog).subscribe(log => this.currentBoard.logs.unshift(log));
  }

  configureLog(message: string) {
    this.addedLog = {
      id: null,
      createTime: null,
      boardId: this.currentBoard.id,
      message: message,
      userId: null,
      username: null
    };
  }

  addNewLogs() {
    const logLastId = this.currentBoard.logs[this.currentBoard.logs.length - 1].id;
    this.boardService.getMoreLogs(logLastId, this.currentBoard.id).subscribe(logs => {
      for (const newLog of logs) {
        this.currentBoard.logs.push(newLog);
      }
    });
  }

  changeIsChangeBackgroundButtonClicked() {
    this.isChangeBackgroundButtonClicked = (!this.isChangeBackgroundButtonClicked);
  }

  getImageByLocalImage($event) {
    if (this.checkFileValidity($event.target.files[0])) {
      this.readThis($event.target);
    }
    this.confirmedImageName = $event.target.files[0].name;
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  checkFileValidity(file: File): boolean {
    const elements = file.name.split('.');
    const imageFormat = elements[elements.length - 1];
    if (imageFormat !== 'jpg') {
      document.getElementById('error-message-local-image').innerHTML = 'Invalid format';
      return false;
    } else {
      document.getElementById('error-message-local-image').innerHTML = '';
    }
    if (file.size > 10_000_000) {
      document.getElementById('error-message-local-image').innerHTML = 'File is too large';
      return false;
    } else {
      document.getElementById('error-message-local-image').innerHTML = '';
    }
    return true;
  }

  changeBackgroundImage() {
    const elems = this.image.toString().split('base64,');
    this.boardService.saveBackgroundImage(this.currentBoard, elems[elems.length - 1], this.confirmedImageName).subscribe();
    this.confirmedImage = this.image;
  }
}
