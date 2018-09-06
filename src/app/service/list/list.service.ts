import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {debounceTime} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  private simpleUrl = '/lists/';
  constructor(private http: HttpClient) { }


}
