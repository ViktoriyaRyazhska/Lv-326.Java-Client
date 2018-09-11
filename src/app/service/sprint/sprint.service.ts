import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../models/Sprint';
import {OrderSprint} from '../../models/OrderSprint';
import {TicketDto} from '../../models/TicketDto';
import {Ticket} from '../../models/Ticket';
import {ErrorService} from '../error/error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private simpleUrl = 'http://localhost:8080/api/sprint';

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  getSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.get<Sprint>(url, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  addSprint(boardId: number, sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}${boardId}`;
    return this.http.post<Sprint>(url, sprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editSprint(newName: string, sprint: Sprint): Observable<Sprint> {
    sprint.label = newName;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  archiveSprint(sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}archive/${sprint.id}`;
    return this.http.delete<Sprint>(url, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  deleteSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.delete<Sprint>(url, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  saveSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.concat('T00:00:00Z');
    sprint.endDate = endDate.concat('T00:00:00Z');
    sprint.goal = goal;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  startSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.concat('T00:00:00Z');
    sprint.endDate = endDate.concat('T00:00:00Z');
    sprint.goal = goal;
    sprint.sprintStatus = 'ACTIVE';
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  finishSprint(sprint: Sprint): Observable<Sprint> {
    sprint.sprintStatus = 'COMPLETED';
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  updateTicketForSprint(ticket: TicketDto) {
    const url = `http://localhost:8080/api/sprint/tickets/`;
    this.http.put(url, ticket, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  updateSprintOrder(orderSprint: OrderSprint) {
    const url = `${this.simpleUrl}order`;
    this.http.put(url, orderSprint, this.createHttpOptions()).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `http://localhost:8080/api/sprint/tickets`;
    const boardId = ticket.boardId;
    const name = ticket.name;
    const tableListId = ticket.tableListId;
    const sprintId = ticket.sprintId;
    return this.http.post<Ticket>(url, {boardId, name, tableListId, sprintId});
  }

  updateOrder(id: string, sprintId: string, sequenceNumber: number) {
    const url = `http://localhost:8080/api/sprint/tickets`;
    this.http.patch(url, {id, sprintId, sequenceNumber}).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }
}
