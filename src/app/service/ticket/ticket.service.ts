import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../models/Board';
import {Observable} from 'rxjs';
import {List} from '../../models/List';
import {Ticket} from '../../models/Ticket';
import {TicketDto} from '../../models/TicketDto';
import {CommentDto} from '../../models/CommentDto';
import {HistoryLog} from '../../models/HistoryLog';
import {compileInjector} from '@angular/compiler';
import {ErrorService} from '../error/error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  archiveTicket(ticketId: number): Observable<TicketDto> {
    const id = ticketId;
    const status = 'DELETED';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, status}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  saveComment(comment: CommentDto): Observable<CommentDto> {
    const message = comment.message;
    const ticketId = comment.ticketId;
    return this.http.post<CommentDto>(`/api/comments`, {message, ticketId}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editComment(comment: CommentDto): Observable<CommentDto> {
    return this.http.put<CommentDto>(`/api/comments`, comment, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  deleteComment(id: number): Observable<CommentDto> {
    const url = `/api/comments/${id}`;
    return this.http.delete<CommentDto>(url, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }


  getTicket(ticketId: number): Observable<TicketDto> {
    const url = `/api/tickets/${ticketId}`;
    return this.http.get<TicketDto>(url, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editTicketName(ticketDto: TicketDto): Observable<TicketDto> {
    const id = ticketDto.id;
    const name = ticketDto.name;
    return this.http.patch<TicketDto>(`/api/tickets`, {id, name}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  editDescription(ticketDto: TicketDto): Observable<TicketDto> {
    const id = ticketDto.id;
    const description = ticketDto.description;
    return this.http.patch<TicketDto>(`/api/tickets`, {id, description}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  openForm() {
    document.getElementById('myForm').style.display = 'flex';
    document.getElementById('closeForm').style.display = 'flex';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('closeForm').style.display = 'none';
  }

  setPriorityLow(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketPriority = 'LOW';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketPriority}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setPriorityMedium(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketPriority = 'MEDIUM';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketPriority}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setPriorityHigh(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketPriority = 'HIGH';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketPriority}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketIssueTypeBug(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketIssueType = 'BUG';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketIssueType}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketIssueTypeTask(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketIssueType = 'TASK';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketIssueType}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketIssueTypeStory(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketIssueType = 'STORY';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketIssueType}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketIssueTypeEpic(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const ticketIssueType = 'EPIC';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, ticketIssueType}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationXS(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'XS';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationS(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'S';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationM(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'M';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationL(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'L';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationXL(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'XL';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  setTicketEstimationXXL(ticketDto: TicketDto) {
    const id = ticketDto.id;
    const estimation = 'XXL';
    return this.http.patch<TicketDto>(`/api/tickets`, {id, estimation}, this.createHttpOptions())
      .pipe(catchError(err => this.errorService.errorHandler(err)));
  }
}
