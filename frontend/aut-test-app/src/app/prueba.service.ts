import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) {
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
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post('http://ec2-18-208-248-251.compute-1.amazonaws.com:8000/api/test/end2end-tests', formData, {
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
    // let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post('http://ec2-18-208-248-251.compute-1.amazonaws.com:8000/api/test/bdd-tests', formData, {
      // 'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }
}
