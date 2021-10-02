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
    const url = `${environment.RESOURCE_SERVER}/doc/all/${id}`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get<DocModel[]>(url, httpOptions);
  }

  deleteDocument(id ?: string) {
    const url = `${environment.RESOURCE_SERVER}/doc/delete/${id}`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.delete(url, httpOptions);
  }

  fetchDoc(docIdParam: string): Observable<DocModel> {
    const url = `${environment.RESOURCE_SERVER}/doc/fetch/${docIdParam}`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(url, httpOptions);
  }

  updateDoc(doc: DocModel) {
    const url = `${environment.RESOURCE_SERVER}/doc/update`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.put(url, doc, httpOptions);
  }

  fetchRecentDocs(): Observable<DocModel[]> {
    const url = `${environment.RESOURCE_SERVER}/doc/recent`;
    const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      })
    };
    // @ts-ignore
    return this.httpClient.get(url, httpOptions);
  }
}
