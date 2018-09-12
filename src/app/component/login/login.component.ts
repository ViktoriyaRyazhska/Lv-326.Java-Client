import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthenticationService} from '../../service/login/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private socialAuthService: AuthService) {
  }

  public loginWithGoogle() {
     const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.authService.loginWithGoogle(userData.token);
      }
    ).catch(reason => {
    });
  }

  ngOnInit() {
  }


  loginGeneral(form: NgForm) {
    const usernameOrEmail = form.value.usernameOrEmail;
    const password = form.value.password;
    this.authService.login(usernameOrEmail, password);
  }
}
