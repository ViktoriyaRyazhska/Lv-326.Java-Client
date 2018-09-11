import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) { }

  errorHandler(error: HttpErrorResponse) {
    localStorage.setItem('errorStatus', String(error.status));
    localStorage.setItem('errorText', error.statusText);
    this.router.navigate(['error']);
    return Observable.throw(error.message);
  }
}
