import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from '../../models/UserDto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByToken(): Observable<UserDto> {
    const url = '/users';
    return this.http.get<UserDto>(url);
  }
}
