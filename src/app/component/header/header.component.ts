import {Component, DoCheck, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/login/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  loggedIn = localStorage.getItem('jwtToken');

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.loggedIn = localStorage.getItem('jwtToken');
  }

  logOut() {
    this.authenticationService.logOut();
    localStorage.removeItem('language');
    this.translate.use('en');
    this.router.navigate(['/']);
  }

  myProfile() {
    this.router.navigate([`profile`]);
  }
}

