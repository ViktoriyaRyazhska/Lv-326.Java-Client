import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {debounceTime} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private simpleUrl = '/api/lists/';
  constructor(private http: HttpClient) { }


}
