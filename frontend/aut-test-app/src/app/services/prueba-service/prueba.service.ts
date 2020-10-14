import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient, private httpClinet: HttpService) {
  }


  saveFiles(form): Observable<any> {
    const formData = new FormData();
    // formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('testScript', form.get('testScript').value);
    formData.append('framework', '1');
    formData.append('browser', '1');
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post('http://localhost:8000/api/test/end2end-tests', formData, {
      // 'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }


  saveFilesBDD(form): Observable<any> {
    const formData = new FormData();
    // formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('features', form.get('features').value);
    formData.append('stepsScript', form.get('stepsScript').value);
    formData.append('framework', '1');
    formData.append('browser', '1');
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post('http://localhost:8000/api/test/bdd-tests', formData, {
      // 'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }
  saveMonkeyTest(form): Observable<any> {
    const formData = new FormData();
    // formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('events', form.get('events').value);
    formData.append('framework', '1');
    formData.append('browser', '1');
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.httpClinet.postJSON('bdd-tests', formData);
  }

}
