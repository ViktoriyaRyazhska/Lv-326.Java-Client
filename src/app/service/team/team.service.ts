import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {TeamDto} from '../../models/TeamDto';
import {Board} from '../../models/Board';
import {UserDto} from '../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private simpleUrl = '/teams';

  constructor(private http: HttpClient) {
  }

  getTeam(id: number): Observable<TeamDto> {
    const url = `${this.simpleUrl}${id}`;
    return this.http.get<TeamDto>(url);
  }

  getAllUserTeams(): Observable<TeamDto[]> {
    const url = `${this.simpleUrl}`;
    return this.http.get<TeamDto[]>(url);
  }

  getAllTeamBoards(id: number): Observable<Board[]> {
    const url = `${this.simpleUrl}${id}/boards`;
    return this.http.get<Board[]>(url);
  }

  getAllTeamMembers(id: number) {
    const url = `${this.simpleUrl}${id}/members`;
    return this.http.get<UserDto[]>(url);
  }

  deleteUserFromTeam(teamId: number, userId: number): Observable<UserDto> {
    const url = `${this.simpleUrl}${teamId}${userId}`;
    return this.http.delete<UserDto>(url);
  }

  cteateTeam(name: string) {
    const url = `${this.simpleUrl}`;
    return this.http.post<TeamDto>(url, name);
  }
}
