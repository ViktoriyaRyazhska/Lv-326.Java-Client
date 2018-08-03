import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../entity/Board';
import {Observable} from 'rxjs';
import {List} from '../../entity/List';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private simpleUrl = '/api/boards/';

  board: Board;

  constructor(private http: HttpClient) {
  }

  getBoard(id: number): Observable<Board> {
    const url = `${this.simpleUrl}${id}`;
    return this.http.get<Board>(url);
  }

  addList(boardId: number, list: List): Observable<List> {
    const url = `${this.simpleUrl}${boardId}/lists`;
    return this.http.post<List>(url, list, httpOptions);
  }

  deleteList(id: number): Observable<List> {
    const url = `/api/lists/${id}`;
    return this.http.delete<List>(url, httpOptions);
  }

  editList(list: List): Observable<List> {
    const url = `/api/boards/${list.boardId}/lists/${list.id}`;
    return this.http.put<List>(url, list, httpOptions);
  }
}
