import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorText: string;

  errorStatus: string;

  constructor() {
  }

  ngOnInit() {
    this.errorStatus = localStorage.getItem('errorStatus');
    if (this.errorStatus === '401') {
      this.errorText = 'You can\'t see this page';
    } else {
      this.errorText = 'Something goes wrong';
    }
  }

}
