import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DocModel} from '../models/DocModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  getMyDocs(id: any) {
    const url = `${environment.base_url}:${environment.doc_port}/doc/${id}/all`;
    return this.httpClient.get<DocModel[]>(url);
  }

  constructor(private httpClient: HttpClient) {
  }
}
