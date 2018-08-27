import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../entity/Sprint';
import {OrderSprint} from '../../entity/OrderSprint';
import {TicketDto} from '../../entity/TicketDto';

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

  saveSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.concat('T00:00:00Z');
    sprint.endDate = endDate.concat('T00:00:00Z');
    sprint.goal = goal;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions());
  }

  startSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.concat('T00:00:00Z');
    sprint.endDate = endDate.concat('T00:00:00Z');
    sprint.goal = goal;
    sprint.sprintStatus = 'ACTIVE';
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions());
  }

  finishSprint(sprint: Sprint): Observable<Sprint> {
    sprint.sprintStatus = 'COMPLETED';
    const url = `${this.simpleUrl}${sprint.id}`;
    console.log(sprint);
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions());
  }

  updateSprintForTicket(ticket: TicketDto) {
    const url = `api/tickets`;
    this.http.put(url, ticket, this.createHttpOptions()).subscribe();
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
