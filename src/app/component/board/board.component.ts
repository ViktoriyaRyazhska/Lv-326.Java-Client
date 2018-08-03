import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../entity/Board';
import {List} from '../../entity/List';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  currentBoard: Board;

  addedList: List;

  isAddListButtonClicked = false;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getInitBoard();
  }

  getInitBoard() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBoard(id);
  }

  getBoard(id: number) {
    this.boardService.getBoard(id).subscribe(board => {
      console.log(board);
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
      isEditListNameInProgress: false
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
    const number = this.currentBoard.tableListDtoList.indexOf(list);
    this.boardService.deleteList(list.id).subscribe();
    this.currentBoard.tableListDtoList.splice(number);
  }

  editList(list: List, newName: string) {
    list.name = newName;
    this.boardService.editList(list).subscribe(updatedList =>
      this.currentBoard.tableListDtoList[this.currentBoard.tableListDtoList.indexOf(list)] = updatedList);
    this.setEditableListName(list);
  }

  setEditableListName(list: List) {
    const id = this.currentBoard.tableListDtoList.indexOf(list);
    console.log(id);
    console.log(this.currentBoard.tableListDtoList[id]);
    this.currentBoard.tableListDtoList[id].isEditListNameInProgress
      = (this.currentBoard.tableListDtoList[id].isEditListNameInProgress) ? false : true;
  }

}
