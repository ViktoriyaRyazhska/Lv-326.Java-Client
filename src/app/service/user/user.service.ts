import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from '../../models/UserDto';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorService} from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  getUserByToken(): Observable<UserDto> {
    const url = '/api/users';
    return this.http.get<UserDto>(url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }
}
