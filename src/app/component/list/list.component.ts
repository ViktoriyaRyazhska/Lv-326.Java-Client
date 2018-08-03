import {Component, Input, OnInit} from '@angular/core';
import {List} from '../../entity/List';
import {ListService} from '../../service/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  constructor(private listService: ListService) {
  }

  ngOnInit() {
  }
}
