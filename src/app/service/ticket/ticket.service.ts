import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../entity/Board';
import {Observable} from 'rxjs';
import {List} from '../../entity/List';
import {Ticket} from '../../entity/Ticket';
import {TicketDto} from '../../entity/TicketDto';

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

  getTicket(ticketId: number): Observable<TicketDto> {
    const url = `/api/tickets/${ticketId}`;
    return this.http.get<TicketDto>(url, this.createHttpOptions());
  }

  openForm() {
    document.getElementById('myForm').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }
}
