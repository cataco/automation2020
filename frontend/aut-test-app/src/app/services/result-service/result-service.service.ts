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

}
