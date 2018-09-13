import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Board} from '../../models/Board';
import {Observable} from 'rxjs';
import {List} from '../../models/List';
import {Ticket} from '../../models/Ticket';
import {HistoryLog} from '../../models/HistoryLog';
import {OrderTableList} from '../../models/OrderTableList';
import {OrderTicket} from '../../models/OrderTicket';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorService} from '../error/error.service';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private simpleUrlBoard = '/api/boards/';
  private simpleUrlList = '/api/lists';
  private simpleUrlLog = '/api/log';
  private simpleUrlTicket = '/api/tickets';

  private orderTableList: OrderTableList;

  constructor(private http: HttpClient,
              private router: Router,
              private errorService: ErrorService) {
  }

  getBoard(id: number): Observable<Board> {
    const url = `${this.simpleUrlBoard}${id}`;
    return this.http.get<Board>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getBoardForSprint(boardId: number, sprintId: number): Observable<Board> {
    const url = `${this.simpleUrlBoard}${boardId}/sprint/${sprintId}`;
    return this.http.get<Board>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  createBoard(board: Board): Observable<Board> {
    const url = `${this.simpleUrlBoard}`;
    return this.http.post<Board>(url, board).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getAllUserBoards(): Observable<Board[]> {
    const url = `${this.simpleUrlBoard}`;
    return this.http.get<Board[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  addList(boardId: number, list: List): Observable<List> {
    const url = `${this.simpleUrlList}/board/${boardId}`;
    return this.http.post<List>(url, list).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  deleteList(id: number): Observable<List> {
    const url = `${this.simpleUrlList}/${id}`;
    return this.http.delete<List>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editList(list: List): Observable<List> {
    const url = `${this.simpleUrlList}/${list.id}/board/${list.boardId}`;
    return this.http.put<List>(url, list).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editBoard(newName: string, board: Board): Observable<Board> {
    board.name = newName;
    const url = `${this.simpleUrlBoard}/${board.id}`;
    return this.http.put<Board>(url, board).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `${this.simpleUrlTicket}`;
    const boardId = ticket.boardId;
    const name = ticket.name;
    const tableListId = ticket.tableListId;
    const sequenceNumber = ticket.sequenceNumber;
    return this.http.post<Ticket>(url, {
      boardId,
      name,
      tableListId,
      sequenceNumber
    }).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  createLog(historyLog: HistoryLog): Observable<HistoryLog> {
    const url = `${this.simpleUrlLog}`;
    return this.http.post<HistoryLog>(url, historyLog).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getMoreLogs(lastLogId: number, boardId: number): Observable<HistoryLog[]> {
    const url = `${this.simpleUrlLog}/${boardId}/${lastLogId}`;
    return this.http.get<HistoryLog[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  saveBackgroundImage(board: Board, base64Image: string, imageName: string) {
    const url = `${this.simpleUrlBoard}/image`;
    board.image = base64Image;
    board.imageName = imageName;
    return this.http.put(url, board).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  updateListOrder(boardId: number, listId: string, sequenceNumber: number) {
    listId = listId.split('list')[1];
    this.createOrderTableList(boardId, listId, sequenceNumber);
    const url = `${this.simpleUrlList}/order`;
    this.http.put(url, this.orderTableList).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  createOrderTableList(boardId: number, listId: string, sequenceNumber: number) {
    this.orderTableList = {
      boardId: boardId,
      listId: listId,
      sequenceNumber: sequenceNumber
    };
  }

  getExistingImagesUrls(boardId: number): Observable<string[]> {
    const url = `${this.simpleUrlBoard}/images/${boardId}`;
    return this.http.get<string[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setExistingImageOnBackground(imageUrl: string, boardId: number) {
    const url = `${this.simpleUrlBoard}/images/${boardId}`;
    this.http.put(url, imageUrl).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  clearBoardBackground(boardId: number) {
    const url = `${this.simpleUrlBoard}/images/${boardId}`;
    this.http.delete(url).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  updateTicketOrdering(orderTicket: OrderTicket) {
    const url = `${this.simpleUrlTicket}/order`;
    this.http.put(url, orderTicket).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }
}

