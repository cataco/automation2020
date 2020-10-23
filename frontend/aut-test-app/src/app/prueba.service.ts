import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) {
  }


  saveFiles(form): Observable<any> {
    const formData = new FormData();
    //formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('testScript', form.get('testScript').value);
    formData.append('framework', '1');
    formData.append('browser', '1');
    //let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post('http://localhost:8000/api/test/end2end-tests', formData, {
      //'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }

  runE2EMobile(form): Observable<any> {
    const formData = new FormData();
    formData.append('name', form.get('name').value);
    formData.append('appName', form.get('appName').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('appApk', form.get('appApk').value);
    formData.append('scripts', form.get('testScript').value);
    formData.append('androidVersion', form.get('androidVersion').value);
    return this.http.post('http://127.0.0.1:8000/api/test/mobile-tests', formData, {
      //'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }

  getFrameworks(): Observable<any> {
     return this.http.get( 'http://127.0.0.1:8000/api/test/frameworks');
  }
   getBrowsers(): Observable<any> {
     return this.http.get( 'http://127.0.0.1:8000/api/test/browsers');
  }

    getStrategies(): Observable<any> {
     return this.http.get( 'http://127.0.0.1:8000/api/test/strategies');
  }
    getAndroidVer(): Observable<any> {
     return this.http.get( 'http://127.0.0.1:8000/api/test/android-versions');
  }


    runRandomMobile(form): Observable<any> {
    const formData = new FormData();
    formData.append('name', form.get('name').value);
    formData.append('appName', form.get('appName').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('appApk', form.get('appApk').value);
    formData.append('eventsNumber', form.get('eventsNumber').value);
    formData.append('packageName', form.get('packageName').value);
    formData.append('androidVersion', form.get('androidVersion').value);
    return this.http.post('http://127.0.0.1:8000/api/test/mobile-random-tests', formData, {
      //'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }


  runVrt(form): Observable<any> {
    const formData = new FormData();
    formData.append('name', form.get('name').value);
    formData.append('appName', form.get('appName').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('appUrl', 'url');
    formData.append('url1', form.get('url1').value);
    formData.append('url2', form.get('url2').value);
    formData.append('framework', form.get('framework').value);
    formData.append('browser', form.get('browser').value);
    formData.append('sripts', form.get('sripts').value);
    return this.http.post('http://127.0.0.1:8000/api/test/vrt-tests', formData, {
      //'headers': headers, reportProgress: true,
      observe: 'events'
    });
  }


  saveFilesBDD(form): Observable<any> {
    const formData = new FormData();
    //formData.append('nombre', documento.name);
    formData.append('appName', form.get('appName').value);
    formData.append('appUrl', form.get('appUrl').value);
    formData.append('appVersion', form.get('appVersion').value);
    formData.append('name', form.get('name').value);
    formData.append('strategy', form.get('strategy').value);
    formData.append('features', form.get('features').value);
    formData.append('stepsScript', form.get('stepsScript').value);
    formData.append('framework', '1');
    formData.append('browser', '1');
    return this.http.post('http://localhost:8000/api/test/bdd-tests', formData, {
      observe: 'events'
    });
  }
}
