import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../../models/Board';
import {Observable} from 'rxjs';
import {List} from '../../models/List';
import {Ticket} from '../../models/Ticket';
import {HistoryLog} from '../../models/HistoryLog';
import {OrderTableList} from '../../models/OrderTableList';
import {OrderTicket} from '../../models/OrderTicket';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private simpleUrl = '/api/boards/';

  private orderTableList: OrderTableList;

  constructor(private http: HttpClient) {
  }

  getBoard(id: number): Observable<Board> {
    const url = `${this.simpleUrl}${id}`;
    return this.http.get<Board>(url);
  }

  createBoard(board: Board): Observable<Board> {
    const url = `${this.simpleUrl}`;
    return this.http.post<Board>(url, board);
  }

  getAllUserBoards(): Observable<Board[]> {
    const url = `${this.simpleUrl}`;
    return this.http.get<Board[]>(url);
  }

  addList(boardId: number, list: List): Observable<List> {
    const url = `/api/lists/board/${boardId}`;
    return this.http.post<List>(url, list);
  }

  deleteList(id: number): Observable<List> {
    const url = `/api/lists/${id}`;
    return this.http.delete<List>(url);
  }

  editList(list: List): Observable<List> {
    const url = `/api/lists/${list.id}/board/${list.boardId}`;
    return this.http.put<List>(url, list);
  }

  editBoard(newName: string, board: Board): Observable<Board> {
    board.name = newName;
    const url = `/api/boards/${board.id}`;
    return this.http.put<Board>(url, board);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `/api/tickets`;
    const boardId = ticket.boardId;
    const name = ticket.name;
    const tableListId = ticket.tableListId;
    const sequenceNumber = ticket.sequenceNumber;
    return this.http.post<Ticket>(url, {boardId, name, tableListId, sequenceNumber});
  }

  createLog(historyLog: HistoryLog): Observable<HistoryLog> {
    const url = '/api/log';
    return this.http.post<HistoryLog>(url, historyLog);
  }

  getMoreLogs(lastLogId: number, boardId: number): Observable<HistoryLog[]> {
    const url = `/api/log/${boardId}/${lastLogId}`;
    return this.http.get<HistoryLog[]>(url);
  }

  saveBackgroundImage(board: Board, base64Image: string, imageName: string) {
    const url = `/api/boards/image`;
    board.image = base64Image;
    board.imageName = imageName;
    return this.http.put(url, board);
  }

  updateListOrder(boardId: number, listId: string, sequenceNumber: number) {
    listId = listId.split('list')[1];
    this.createOrderTableList(boardId, listId, sequenceNumber);
    const url = `/api/lists/order`;
    this.http.put(url, this.orderTableList).subscribe();
  }

  createOrderTableList(boardId: number, listId: string, sequenceNumber: number) {
    this.orderTableList = {
      boardId: boardId,
      listId: listId,
      sequenceNumber: sequenceNumber
    };
  }

  getExistingImagesUrls(boardId: number): Observable<string[]> {
    const url = `/api/boards/images/${boardId}`;
    return this.http.get<string[]>(url);
  }

  setExistingImageOnBackground(imageUrl: string, boardId: number) {
    const url = `/api/boards/images/${boardId}`;
    this.http.put(url, imageUrl).subscribe();
  }

  clearBoardBackground(boardId: number) {
    const url = `/api/boards/images/${boardId}`;
    this.http.delete(url).subscribe();
  }

  updateTicketOrdering(orderTicket: OrderTicket) {
    const url = '/api/tickets/order';
    this.http.put(url, orderTicket).subscribe();
  }
}

