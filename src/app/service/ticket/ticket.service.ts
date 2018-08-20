import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../entity/Board';
import {Observable} from 'rxjs';
import {List} from '../../entity/List';
import {Ticket} from '../../entity/Ticket';
import {TicketDto} from '../../entity/TicketDto';
import {CommentDto} from '../../entity/CommentDto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

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

  deleteComment(id: number): Observable<CommentDto> {
    const url = `/api/comments/${id}`;
    return this.http.delete<CommentDto>(url, this.createHttpOptions());
  }

  getTicket(ticketId: number): Observable<TicketDto> {
    const url = `/api/tickets/${ticketId}`;
    return this.http.get<TicketDto>(url, this.createHttpOptions());
  }

  openForm() {
    document.getElementById('myForm').style.display = 'flex';
    document.getElementById('closeForm').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('closeForm').style.display = 'none';
  }

  // deleteHero (hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.heroesUrl}/${id}`;
  //
  //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }
}
