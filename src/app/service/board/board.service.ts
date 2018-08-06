import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../entity/Board';
import {Observable} from 'rxjs';
import {List} from '../../entity/List';
import {Ticket} from '../../entity/Ticket';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private simpleUrl = '/api/boards/';

  constructor(private http: HttpClient) {
  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  getBoard(id: number): Observable<Board> {
    const url = `${this.simpleUrl}${id}`;
    return this.http.get<Board>(url, this.createHttpOptions());
  }

  addList(boardId: number, list: List): Observable<List> {
    const url = `${this.simpleUrl}${boardId}/lists`;
    return this.http.post<List>(url, list, this.createHttpOptions());
  }

  deleteList(id: number): Observable<List> {
    const url = `/api/lists/${id}`;
    return this.http.delete<List>(url, this.createHttpOptions());
  }

  editList(list: List): Observable<List> {
    const url = `/api/boards/${list.boardId}/lists/${list.id}`;
    return this.http.put<List>(url, list, this.createHttpOptions());
  }

  editBoard(newName: string, board: Board): Observable<Board> {
    board.name = newName;
    const url = `/api/boards/${board.id}`;
    return this.http.put<Board>(url, board, this.createHttpOptions());
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `/api/tickets`;
    return this.http.post<Ticket>(url, ticket, this.createHttpOptions());
  }
}