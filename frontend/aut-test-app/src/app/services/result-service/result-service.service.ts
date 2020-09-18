import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpService: HttpService) { }

  getReportResult() {
    return this.httpService.getRequestWithoutPar('results').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
  getReportStats() {
    return this.httpService.getRequestWithoutPar('stats').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

}
