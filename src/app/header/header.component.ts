import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = localStorage.getItem("jwtToken");

  constructor() {
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.loggedIn = localStorage.getItem("jwtToken");
  }

}
