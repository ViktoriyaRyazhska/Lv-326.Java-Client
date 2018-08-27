import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../../entity/Team';
import {Board} from '../../entity/Board';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private simpleUrl = '/api/teams/';

  constructor(private http: HttpClient) {
  }

  createHttpOptions() {
    const headers = JSON.parse(localStorage.getItem('appHeaders'));
    return {headers: new HttpHeaders(headers)};
  }

  getAllUserTeams(): Observable<Team[]> {
    const url = `${this.simpleUrl}`;
    return this.http.get<Team[]>(url, this.createHttpOptions());
  }
}
