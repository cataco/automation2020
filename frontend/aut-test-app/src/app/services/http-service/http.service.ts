import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  baseUrl = environment.urlBack;
  rootUrl = environment.urlRoot;

  postJSON(url, data): Observable<HttpResponse<string>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.post<string>(this.baseUrl + url, data,
        {
          headers: httpHeaders,
          observe: 'response'
        }
    );
  }

  getRequest(url, data): Observable<any> {
    return this.http.get(this.baseUrl + url + '?' + this.listParams(data) );
  }

  getRequestWithoutPar(url): Observable<any> {
    return this.http.get(this.baseUrl + url );
  }

  getRequestWithoutParRoot(url): Observable<any> {
    return this.http.get(this.rootUrl + url );
  }

  listParams(data) {
    if (data === '') {
        return '';
    } else {
        return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    }
  }
}
