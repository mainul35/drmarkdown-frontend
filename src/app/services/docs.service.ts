import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DocModel} from '../models/DocModel';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  public docs: Observable<DocModel[]> = of([]);

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private authService: AuthenticationService) {
  }

  getMyDocs(id: string): Observable<DocModel[]> {
    const url = `${environment.RESOURCE_SERVER}/doc/all/${id}`;
    return this.httpClient.get<DocModel[]>(url);
  }

  deleteDocument(id ?: string) {
    const url = `${environment.RESOURCE_SERVER}/doc/delete/${id}`;
    return this.httpClient.delete(url);
  }

  fetchDoc(docIdParam: string): Observable<DocModel> {
    const url = `${environment.RESOURCE_SERVER}/doc/fetch/${docIdParam}`;
    return this.httpClient.get(url);
  }

  updateDoc(doc: DocModel) {
    const url = `${environment.RESOURCE_SERVER}/doc/update`;
    // const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${jwtToken}`
    //   })
    // };
    // return this.httpClient.put(url, doc, httpOptions);
    return this.httpClient.put(url, doc);
  }

  createDoc(doc: DocModel) {
    const url = `${environment.RESOURCE_SERVER}/doc/create`;
    doc.userId = this.authService.currentUserValue.id;
    // const jwtToken = JSON.parse(this.cookieService.get(AuthenticationService.TOKEN));
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${jwtToken}`
    //   })
    // };
    // return this.httpClient.post(url, doc, httpOptions);
    return this.httpClient.post(url, doc);
  }

  fetchRecentDocs(): Observable<DocModel[]> {
    const url = `${environment.RESOURCE_SERVER}/doc/recent`;
    // @ts-ignore
    return this.httpClient.get(url);
  }
}
