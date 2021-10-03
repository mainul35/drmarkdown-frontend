import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {UserModel} from '../models/UserModel';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser: UserModel = this.authService.currentUserValue;
    if (currentUser && currentUser.jwtToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.jwtToken}`
        }
      });
    }

    return next
      .handle(req);
  }
}
