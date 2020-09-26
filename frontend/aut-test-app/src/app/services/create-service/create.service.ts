import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private httpService: HttpService) { }

  // tslint:disable-next-line:typedef
  createMonkeyTest(data) {
    return this.httpService.postJSON('/api/test/random-tests', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

}
