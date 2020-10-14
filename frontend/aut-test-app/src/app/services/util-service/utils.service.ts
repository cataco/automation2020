import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private httpService: HttpService) { }

  // tslint:disable-next-line:typedef
  getStrategies() {
    return this.httpService.getRequestWithoutPar('strategies').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getFrameworks() {
    return this.httpService.getRequestWithoutPar('frameworks').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getBrowsers() {
    return this.httpService.getRequestWithoutPar('browsers').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

}
