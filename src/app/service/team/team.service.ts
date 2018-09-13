import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {TeamDto} from '../../models/TeamDto';
import {Board} from '../../models/Board';
import {UserDto} from '../../models/UserDto';
import {ErrorService} from '../error/error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private simpleUrl = '/api/teams';

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
  }

  getTeam(id: number): Observable<TeamDto> {
    const url = `${this.simpleUrl}${id}`;
    return this.http.get<TeamDto>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getAllUserTeams(): Observable<TeamDto[]> {
    const url = `${this.simpleUrl}`;
    return this.http.get<TeamDto[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getAllTeamBoards(id: number): Observable<Board[]> {
    const url = `${this.simpleUrl}${id}/boards`;
    return this.http.get<Board[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  getAllTeamMembers(id: number) {
    const url = `${this.simpleUrl}${id}/members`;
    return this.http.get<UserDto[]>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  deleteUserFromTeam(teamId: number, userId: number): Observable<UserDto> {
    const url = `${this.simpleUrl}${teamId}${userId}`;
    return this.http.delete<UserDto>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  cteateTeam(name: string) {
    const url = `${this.simpleUrl}`;
    return this.http.post<TeamDto>(url, name).pipe(catchError(err => this.errorService.errorHandler(err)));
  }
}
