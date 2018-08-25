import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from "../../../../node_modules/@angular/common/http";


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string) {

    const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post<any>(`http://localhost:8080/api/auth/signin`, { usernameOrEmail: usernameOrEmail, password: password }, headers)
      .subscribe( token => {
        const header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.accessToken};
        localStorage.setItem('appHeaders', JSON.stringify(header));
        return token;
      } );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
