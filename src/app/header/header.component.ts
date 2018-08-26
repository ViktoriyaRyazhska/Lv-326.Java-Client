import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {AuthenticationService} from "../service/login/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = localStorage.getItem("jwtToken");

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.loggedIn = localStorage.getItem("jwtToken");
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/']);
  }
}
