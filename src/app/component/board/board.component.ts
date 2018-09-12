import {Component, Input, OnInit} from '@angular/core';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../models/Board';
import {List} from '../../models/List';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../models/Ticket';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {TicketService} from '../../service/ticket/ticket.service';
import {TicketDto} from '../../models/TicketDto';
import {HistoryLog} from '../../models/HistoryLog';
import {OrderTicket} from '../../models/OrderTicket';
import {Sprint} from '../../models/Sprint';

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

  isTimeWasEdited = false;

  existingImagesUrls: string[];

  orderTicket: OrderTicket;

  @Input() currentSprint: Sprint;

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
        this.configureOrderTicket(Number(el.getAttribute('id').split('sprint')[0]), Number(listId.substring(4, listId.length)),
          [].slice.call(el.parentElement.children).indexOf(el), Number(el.getAttribute('id').split('sprint')[1]));
        this.boardService.updateTicketOrdering(this.orderTicket);
        const targetTicket = el.children[0].children[0].innerHTML;
        const sourceList = source.parentElement.children[0].children[0].children[0].innerHTML;
        const targetList = target.parentElement.children[0].children[0].children[0].innerHTML;
        this.createUpperLog('Moved ticket ' + targetTicket + ' from list ' + sourceList + ' to list ' + targetList);
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

  configureOrderTicket(ticketId: number, listId: number, sequenceNumber: number, sprintId: number) {
    this.orderTicket = {
      sequenceNumber: sequenceNumber,
      tableListId: listId,
      ticketId: ticketId,
      sprintid: sprintId
    };
  }

  openHistorySidenav() {
    document.getElementById('sidenav-history').style.width = '25%';
    this.formatHistoryLogsToCurrentTimeZone();
  }

  closeNav() {
    document.getElementById('sidenav-history').style.width = '0';
  }

  closeBackgroundNav() {
    document.getElementById('sidenav-background-image').style.width = '0';
    this.changeIsChangeBackgroundButtonClicked();
  }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('boardId')) {
        this.getRouteBoardForSprint();
    } else {
      if (+this.route.snapshot.paramMap.get('id')) {
        this.getRouteBoard();
      }
    }
  }

  getRouteBoard() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBoard(id);
  }

  getRouteBoardForSprint() {
    const boardId = +this.route.snapshot.paramMap.get('boardId');
    const sprintId = +this.route.snapshot.paramMap.get('sprintId');
    this.getBoardForSprint(boardId, sprintId);
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

  getBoardForSprint(boardId: number, sprntId: number) {
    this.boardService.getBoardForSprint(boardId, sprntId).subscribe(board => {
      this.currentBoard = board;
      this.confirmedImage = (board.image) ? board.image : '';
    });
  }

  addList(listName: string) {
    this.configureList(listName);
    if (listName !== '') {
      this.boardService.addList(this.currentBoard.id, this.addedList)
        .subscribe(list => this.currentBoard.tableLists.push(list));
      this.createUpperLog('created list with name ' + listName);
    }
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
    this.createUpperLog('changed createdBoard name to ' + newName);
  }

  editBoardClick() {
    this.isEditBoardClicked = (!this.isEditBoardClicked);
  }

  addNewTicket(ticketName: string, list: List) {
    console.log(document.getElementById('list' + list.id).children[0].children[1].children.length);
    const newTicketSequenceNumber = document.getElementById('list' + list.id).children[0].children[1].children.length;
    this.configureTicket(ticketName, list, newTicketSequenceNumber);
    if (ticketName !== '') {
      const id = this.currentBoard.tableLists.indexOf(list);
      this.boardService.addTicket(this.addedTicket)
        .subscribe(ticket => this.currentBoard.tableLists[id].ticketsForBoardResponse.push(ticket));
      this.createUpperLog('created ticket ' + ticketName);
    }
    this.clickAddNewTicket(list);
  }

  clickAddNewTicket(list: List) {
    const id = this.currentBoard.tableLists.indexOf(list);
    this.currentBoard.tableLists[id].isAddNewTicketClicked
      = (!this.currentBoard.tableLists[id].isAddNewTicketClicked);
  }

  configureTicket(ticketName: string, list: List, sequenceNumber: number) {
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
      sprintId: null,
      sequenceNumber: sequenceNumber
    };
  }

  createUpperLog(message: string) {
    this.configureLog(message);
    this.boardService.createLog(this.addedLog).subscribe(log => {
      this.formatNewLogToTimeZone(log);
      this.currentBoard.logs.unshift(log);
    });
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

  formatHistoryLogsToCurrentTimeZone() {
    const timeZone = new Date().getHours() - new Date().getUTCHours();
    for (const log of this.currentBoard.logs) {
      const date = new Date(log.createTime);
      if (!this.isTimeWasEdited) {
        date.setHours(date.getHours() + timeZone);
        log.createTime = log.createTime.substring(0, 11) + date.toTimeString().substring(0, 8);
      }
    }
    this.isTimeWasEdited = true;
  }

  formatNewLogToTimeZone(log: HistoryLog) {
    const timeZone = new Date().getHours() - new Date().getUTCHours();
    const date = new Date(log.createTime);
    date.setHours(date.getHours() + timeZone);
    log.createTime = log.createTime.substring(0, 11) + date.toTimeString().substring(0, 8);
  }

  getExistingImagesUrls(boardId: number) {
    if (!this.existingImagesUrls) {
      this.boardService.getExistingImagesUrls(boardId).subscribe(urls => this.existingImagesUrls = urls);
    } else {
      this.existingImagesUrls = undefined;
    }
  }

  setExistingImageOnBackground(imageUrl: string) {
    this.boardService.setExistingImageOnBackground(imageUrl, this.currentBoard.id);
    this.confirmedImage = imageUrl;
  }

  clearBoardBackground(boardId: number) {
    this.boardService.clearBoardBackground(boardId);
    this.confirmedImage = '#fff';
  }
}
