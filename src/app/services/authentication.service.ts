import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/UserModel';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static USER_INFO = 'USER_INFO';
  public currentUser$: Observable<UserModel>;
  /*
  * ======================================================
  * Will be used to notify the others who subscribe to it.
  * It is useful for user login / logout events
  * ======================================================
  * */
  private userInfoSubject: BehaviorSubject<UserModel>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    const jsonString = this.cookieService.get(AuthenticationService.USER_INFO);
    if (jsonString === '') {
      // @ts-ignore
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(JSON.parse(this.cookieService.get(AuthenticationService.USER_INFO)));
    }
    this.currentUser$ = this.userInfoSubject.asObservable();
  }

  public get currentUserValue() {
    return this.userInfoSubject.value;
  }

  logout() {
    // Delete the cookie
    this.cookieService.delete(AuthenticationService.USER_INFO);
    this.userInfoSubject.next(null);
  }

  login(username: string, password: string): Observable<UserModel> | null {
    const url = 'http://demo7776459.mockable.io/login';
    return this.httpClient.post<UserModel>(url, {username, password})
      .pipe(
        map(userModel => {
          this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));
          this.userInfoSubject.next(userModel);
          return userModel;
        })
      );
  }

  registerUser(formData: any): Observable<UserModel> {
    // const url = 'http://demo7776459.mockable.io/register';
    const url = 'http://localhost:9999/user/create';
    return this.httpClient.post<UserModel>(url, formData)
      .pipe(
        map(userModel => {
          this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));
          this.userInfoSubject.next(userModel);
          return userModel;
        })
      );
  }
}
