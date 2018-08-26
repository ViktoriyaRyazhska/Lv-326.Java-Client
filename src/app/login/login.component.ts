import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthenticationService} from '../service/login/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private socialAuthService: AuthService,
              private authenticationService: AuthenticationService
  ) {
  }

  public signinWithGoogle() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    console.log('signinWithGoogle');

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { //on success
        //this will return user data from google. What you need is a user token which you will send it to the server
        this.authenticationService.loginWithGoogle(userData.token);

      }
    ).catch(reason => {
      console.log("Can't sign in with google, " + reason);
    });
  }

  ngOnInit() {
  }

  public signInGeneral(form: NgForm) {
    const usernameOrEmail = form.value.usernameOrEmail;
    const password = form.value.password;
    this.authService.login(usernameOrEmail, password);
  }
}
