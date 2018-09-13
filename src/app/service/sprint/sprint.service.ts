import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../models/Sprint';
import {OrderSprint} from '../../models/OrderSprint';
import {Ticket} from '../../models/Ticket';
import {ErrorService} from '../error/error.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private simpleUrl = 'api/sprint/';

  constructor(private http: HttpClient,
              private router: Router,
              private errorService: ErrorService) {
  }

  getSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.get<Sprint>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  addSprint(boardId: number, sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}${boardId}`;
    return this.http.post<Sprint>(url, sprint).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editSprint(newName: string, sprint: Sprint): Observable<Sprint> {
    sprint.label = newName;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  archiveSprint(sprint: Sprint): Observable<Sprint> {
    const url = `${this.simpleUrl}archive/${sprint.id}`;
    return this.http.delete<Sprint>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  deleteSprint(sprintId: number): Observable<Sprint> {
    const url = `${this.simpleUrl}${sprintId}`;
    return this.http.delete<Sprint>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  saveSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.split('T')[0].concat('T00:00:00Z');
    sprint.endDate = endDate.split('T')[0].concat('T00:00:00Z');
    sprint.goal = goal;
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  startSprint(startDate: string, endDate: string, goal: string, sprint: Sprint): Observable<Sprint> {
    sprint.startDate = startDate.split('T')[0].concat('T00:00:00Z');
    sprint.endDate = endDate.split('T')[0].concat('T00:00:00Z');
    sprint.goal = goal;
    sprint.sprintStatus = 'ACTIVE';
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  finishSprint(sprint: Sprint): Observable<Sprint> {
    sprint.sprintStatus = 'COMPLETED';
    sprint.dateOfEnd = sprint.dateOfEnd.concat('T00:00:00Z');
    const url = `${this.simpleUrl}${sprint.id}`;
    return this.http.put<Sprint>(url, sprint).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  updateSprintOrder(orderSprint: OrderSprint) {
    const url = `${this.simpleUrl}order`;
    this.http.put(url, orderSprint).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    console.log('Hello');
    const url = `api/tickets`;
    const boardId = ticket.boardId;
    const name = ticket.name;
    const tableListId = ticket.tableListId;
    const sprintId = ticket.sprintId;
    const sequenceNumber = ticket.sequenceNumber;
    console.log(ticket);
    return this.http.post<Ticket>(url, {boardId, name, tableListId, sprintId, sequenceNumber})
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  updateOrder(ticketId: number, listId: string, sequenceNumber: number, sprintId: number) {
    const url = `api/tickets/order`;
    this.http.put(url, {ticketId, listId, sequenceNumber, sprintId})
      .pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
  }
}
