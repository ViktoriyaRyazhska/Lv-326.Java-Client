import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../models/Sprint';
import {OrderSprint} from '../../models/OrderSprint';
import {Ticket} from '../../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private simpleUrl = '/api/sprint/';

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
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions());
  }

  updateSprintOrder(orderSprint: OrderSprint) {
    const url = `${this.simpleUrl}order`;
    this.http.put(url, orderSprint, this.createHttpOptions()).subscribe();
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `/api/tickets`;
    const boardId = ticket.boardId;
    const name = ticket.name;
    const tableListId = ticket.tableListId;
    const sprintId = ticket.sprintId;
    const sequenceNumber = ticket.sequenceNumber;
    console.log(ticket);
    return this.http.post<Ticket>(url, {boardId, name, tableListId, sprintId, sequenceNumber});
  }

  updateOrder(ticketId: number, listId: string, sequenceNumber: number, sprintId: number) {
    const url = `api/tickets/order`;
    this.http.put(url, {ticketId, listId, sequenceNumber, sprintId}).subscribe();
  }
}
