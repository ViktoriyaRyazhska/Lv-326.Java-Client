import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorText: string;

  editedText: string;

  errorStatus: string;

  constructor() {
  }

  ngOnInit() {
    this.errorStatus = localStorage.getItem('errorStatus');
    this.errorText = localStorage.getItem('errorText');
    if (this.errorStatus === '401') {
      this.editedText = 'You can\'t see this page';
    } else {
      this.editedText = 'Something went wrong';
    }
  }

}
