import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../service/login/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signupGeneral(form: NgForm) {
    console.log('general sign in');

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(username, email, password);
  }

}
