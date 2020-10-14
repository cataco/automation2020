import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient, private httpClinet: HttpService) {
  }
  baseUrl = environment.urlBack;


  saveFiles(form): Observable<any> {
    const formData = new FormData();
    // formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('testScript', form.get('testScript').value);
    formData.append('framework', form.get('framework').value);
    formData.append('browser', form.get('browser').value);
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.baseUrl + 'end2end-tests', formData, {
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
    formData.append('framework', form.get('framework').value);
    formData.append('browser', form.get('browser').value);
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.baseUrl + 'bdd-tests', formData, {
      // 'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }
  saveMonkeyTest(form): Observable<any> {
    const formData = {
      appName: form.get('appName').value,
      appUrl: form.get('appUrl').value,
      appVersion: form.get('appVersion').value,
      name: form.get('name').value,
      strategy: form.get('strategy').value,
      eventsNumber: form.get('events').value,
      framework: form.get('framework').value,
      browser: form.get('browser').value
    };
    return this.httpClinet.postJSON('random-tests', formData);
  }

}
