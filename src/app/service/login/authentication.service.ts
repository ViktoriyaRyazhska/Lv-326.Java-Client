import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {TokenModel} from './token/token-model';
import {AuthService} from 'angular-6-social-login';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {ErrorService} from '../error/error.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private socialAuthService: AuthService,
              private router: Router,
              private errorService: ErrorService) {
  }

  login(usernameOrEmail: string, password: string) {

    const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post<any>(`http://localhost:8080/api/auth/signin`, {
      usernameOrEmail: usernameOrEmail,
      password: password
    }, headers)
      .pipe(catchError(err => this.errorService.errorHandler(err))).subscribe(token => {
        localStorage.setItem('jwtToken', token.accessToken);
        localStorage.setItem('language', token.chosenLanguage);
        this.router.navigate(['/cabinet']);
        return token;
      });
  }

  loginWithGoogle(token: string): void {
    this.http.get<TokenModel>('http://localhost:8080/api/auth/oauth/google?access_token=' + token)
      .pipe(catchError(err => this.errorService.errorHandler(err))).subscribe(jwtToken => {
        console.log('Social login with Google was successful');
        localStorage.setItem('jwtToken', jwtToken.accessToken);
        this.router.navigate(['/cabinet']);
      }, onFail => {
        console.log('Fail to social login with Google');
      });
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    localStorage.clear();
  }

  signup(username: string, email: string, password: string): void {

    this.http.post<any>(`http://localhost:8080/api/auth/signup`, {
      username: username,
      email: email,
      password: password,
      chosenLanguage: 'en'
    }).pipe(catchError(err => this.errorService.errorHandler(err))).subscribe();
    this.router.navigate(['/login']);
  }
}
