import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../entity/Board';
import {List} from '../../entity/List';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../entity/Ticket';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  currentBoard: Board;

  addedList: List;

  addedTicket: Ticket;

  isAddListButtonClicked = false;

  isEditBoardClicked = false;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute) {
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

  getBoard(id: number) {
    this.boardService.getBoard(id).subscribe(board => {
      this.currentBoard = board;
    });
  }

  addList(listName: string) {
    this.configureList(listName);
    this.boardService.addList(this.currentBoard.id, this.addedList)
      .subscribe(list => this.currentBoard.tableListDtoList.push(list));
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
      ticketForBoardResponseDtos: []
    };
  }

  changeButtonClick() {
    if (this.isAddListButtonClicked) {
      this.isAddListButtonClicked = false;
    } else {
      this.isAddListButtonClicked = true;
    }
  }

  deleteList(list: List) {
    if (confirm(`Delete list ${list.name}`)) {
      const number = this.currentBoard.tableListDtoList.indexOf(list);
      this.boardService.deleteList(list.id).subscribe();
      this.currentBoard.tableListDtoList.splice(number, 1);
    }
  }

  editList(list: List, newName: string) {
    list.name = newName;
    this.boardService.editList(list).subscribe(updatedList =>
      this.currentBoard.tableListDtoList[this.currentBoard.tableListDtoList.indexOf(list)] = updatedList);
    this.setEditableListName(list);
  }

  setEditableListName(list: List) {
    const id = this.currentBoard.tableListDtoList.indexOf(list);
    this.currentBoard.tableListDtoList[id].isEditListNameInProgress
      = (!this.currentBoard.tableListDtoList[id].isEditListNameInProgress);
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
    const id = this.currentBoard.tableListDtoList.indexOf(list);
    this.boardService.addTicket(this.addedTicket)
      .subscribe(ticket => this.currentBoard.tableListDtoList[id].ticketForBoardResponseDtos.push(ticket));
    this.clickAddNewTicket(list);
    location.reload();
  }

  clickAddNewTicket(list: List) {
    const id = this.currentBoard.tableListDtoList.indexOf(list);
    this.currentBoard.tableListDtoList[id].isAddNewTicketClicked
      = (!this.currentBoard.tableListDtoList[id].isAddNewTicketClicked);
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
      boardId: this.currentBoard.id
    };
  }

}
