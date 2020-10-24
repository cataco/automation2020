import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpService: HttpService) { }

  // tslint:disable-next-line:typedef
  getReportResult() {
    return this.httpService.getRequestWithoutPar('reports').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getMovilReportResult() {
    return this.httpService.getRequestWithoutPar('report').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getVrtResult() {
    return this.httpService.getRequestWithoutPar('vrt-reports/').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

}
