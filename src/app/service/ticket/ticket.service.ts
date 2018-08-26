import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../entity/Board';
import {Observable} from 'rxjs';
import {List} from '../../entity/List';
import {Ticket} from '../../entity/Ticket';
import {TicketDto} from '../../entity/TicketDto';
import {CommentDto} from '../../entity/CommentDto';
import {HistoryLog} from '../../entity/HistoryLog';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  blalbla: boolean;

  constructor(private http: HttpClient) {

  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  deleteTicket(ticket: TicketDto): Observable<TicketDto> {
    const url = `/api/tickets/${ticket.id}`;
    return this.http.delete<TicketDto>(url, this.createHttpOptions());
  }

  saveComment(comment: CommentDto): Observable<CommentDto> {
    const url = `/api/comments/`;
    return this.http.post<CommentDto>(url, comment, this.createHttpOptions());
  }

  deleteComment(id: number): Observable<CommentDto> {
    const url = `/api/comments/${id}`;
    return this.http.delete<CommentDto>(url, this.createHttpOptions());
  }

  getTicket(ticketId: number): Observable<TicketDto> {
    const url = `/api/tickets/${ticketId}`;
    return this.http.get<TicketDto>(url, this.createHttpOptions());
  }

  editTicket(ticketDto: TicketDto): Observable<TicketDto> {
    const url = `/api/tickets/`;
    return this.http.put<TicketDto>(url, ticketDto, this.createHttpOptions());
  }

  openForm() {
    document.getElementById('myForm').style.display = 'flex';
    document.getElementById('closeForm').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('closeForm').style.display = 'none';
  }

  timeZoneMethod(ticketDto: TicketDto) {
    const timeZone = new Date().getHours() - new Date().getUTCHours();
    for (const comment of ticketDto.comments) {
      const date = new Date(comment.updateTime);
      if (!this.blalbla) {
        date.setHours(date.getHours() + timeZone);
        comment.updateTime = comment.updateTime.substring(0, 11) + date.toTimeString().substring(0, 8);
      }
    }
    this.blalbla = true;
  }
}
