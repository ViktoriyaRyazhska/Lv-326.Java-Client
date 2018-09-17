import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthenticationService} from '../../service/login/authentication.service';
import {Login} from "../../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login;

  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(32),
  ]);

  constructor(private authService: AuthenticationService,
              private socialAuthService: AuthService,
              private formBuilder: FormBuilder) {
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
    this.loginForm = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }


  loginGeneral() {
    this.login = this.loginForm.value;

    // const usernameOrEmail = form.value.usernameOrEmail;
    // const password = form.value.password;
    this.authService.login(this.login.email, this.login.password);

  }
}
