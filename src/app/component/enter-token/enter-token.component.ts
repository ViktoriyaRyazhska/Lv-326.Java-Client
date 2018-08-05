import {Component, OnInit} from '@angular/core';
import { BoardService } from '../../service/board/board.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-enter-token',
  templateUrl: './enter-token.component.html',
  styleUrls: ['./enter-token.component.css']
})
export class EnterTokenComponent extends BoardService implements OnInit {


  constructor() {
    super(null);
  }

  ngOnInit() {
  }

  enterToken(token: string) {
    if (token) {
      const header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};
      localStorage.setItem('appHeaders', JSON.stringify(header));
    }
  }

}
