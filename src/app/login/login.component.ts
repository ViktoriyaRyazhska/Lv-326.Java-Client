import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../service/login/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const usernameOrEmail = form.value.usernameOrEmail;
    const password = form.value.password;
    this.authService.login(usernameOrEmail, password);
  }

}

