import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('jwtToken');
    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ` + localStorage.getItem('jwtToken')}
      });
    }
    return next.handle(request);
  }
}
