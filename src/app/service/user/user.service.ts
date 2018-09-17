import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from '../../models/UserDto';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorService} from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = '/api/users';

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
  }

  getUserByToken(): Observable<UserDto> {
    return this.http.get<UserDto>(this.url).pipe(catchError(err => this.errorService.errorHandler(err)));
  }

  changeChosenLanguage(language: string) {
    this.http.patch(this.url + '/language', language).subscribe();
  }

  changeFirstAndLastName(newFirstName: string, newLastName: string) {
    this.http.patch(this.url + '/name', {firstName: newFirstName, lastName: newLastName}).subscribe();
  }

  changePassword(currentPass: string, newPass: string) {

  }
}
