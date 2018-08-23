import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../entity/Sprint';
import {OrderSprint} from '../../entity/OrderSprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private simpleUrl = '/api/sprint/';

  private orderSprint: OrderSprint;

  constructor(private http: HttpClient) {
  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  getSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.get<Sprint>(url, this.createHttpOptions());
  }

  getSprintBacklogByboard(boardId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}backlog/${boardId}`;
    return this.http.get<Sprint>(url, this.createHttpOptions());
  }

  addSprint(boardId: number, sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}${boardId}`;
    return this.http.post<Sprint>(url, sprint, this.createHttpOptions());
  }

  editSprint(newName: string, sprint: Sprint): Observable<Sprint> {
    sprint.label = newName;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions());
  }

  archiveSprint(sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}archive/${sprint.id}`;
    console.log(sprint);
    return this.http.delete<Sprint>(url, this.createHttpOptions());
  }

  deleteSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.delete<Sprint>(url, this.createHttpOptions());
  }

  updateSprintOrder(boardId: number, sprintId: string, sequenceNumber: number) {
    this.createOrderSprint(boardId, sprintId, sequenceNumber);
    const url = `${this.simpleUrl}order`;
    console.log(this.orderSprint);
    this.http.put(url, this.orderSprint, this.createHttpOptions()).subscribe();
  }

  createOrderSprint(boardId: number, sprintId: string, sequenceNumber: number) {
    this.orderSprint = {
      boardId: boardId,
      sprintId: sprintId,
      sequenceNumber: sequenceNumber
    };
  }
}
