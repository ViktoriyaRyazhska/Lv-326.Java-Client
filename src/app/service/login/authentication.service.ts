import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from "@angular/common/http";
import {TokenModel} from "./token/token-model";
import {AuthService} from 'angular-6-social-login';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private socialAuthService: AuthService) {
  }


  login(usernameOrEmail: string, password: string) {

    const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post<any>(`http://localhost:8080/api/auth/signin`, {
      usernameOrEmail: usernameOrEmail,
      password: password
    }, headers)
      .subscribe(token => {
        localStorage.setItem('jwtToken', token.accessToken);
        return token;
      });
  }

  loginWithGoogle(token: string): void {
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
}
