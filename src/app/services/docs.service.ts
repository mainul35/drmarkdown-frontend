import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DocModel} from '../models/DocModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  public docs: Observable<DocModel[]> = of([]);

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getMyDocs(id: string): Observable<DocModel[]> {
    const url = `${environment.RESOURCE_SERVER}/doc/${id}/all`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get<DocModel[]>(url, httpOptions);
  }

  deleteDocument(id ?: string) {
    const url = `${environment.RESOURCE_SERVER}/doc/${id}/delete`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.delete(url, httpOptions);
  }
}
