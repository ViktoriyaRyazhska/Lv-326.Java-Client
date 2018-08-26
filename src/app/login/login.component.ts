import {HttpClient} from '@angular/common/http';
import {TokenModel} from 'src/app/service/login/token/token-model';
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
              private http: HttpClient) {
  }

  public signinWithGoogle() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    console.log('signinWithGoogle');

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { //on success
        //this will return user data from google. What you need is a user token which you will send it to the server
        this.sendToRestApiMethod(userData.token);
      }
    ).catch(reason => {
      console.log(reason);
    });
  }

  sendToRestApiMethod(token: string): void {
    console.log('sendToRestApiMethod');
    this.http.get<TokenModel>('http://localhost:8080/api/auth/oauth/google?access_token=' + token)
      .subscribe(jwtToken => {
        console.log("Social login with Google was success");
        localStorage.setItem('jwtToken', jwtToken.accessToken);
        //login was successful
        //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
      }, onFail => {
        console.log("Fail to social login with Google");
        //login was unsuccessful
        //show an error message
      });
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const usernameOrEmail = form.value.usernameOrEmail;
    const password = form.value.password;
    this.authService.login(usernameOrEmail, password);
  }
}
