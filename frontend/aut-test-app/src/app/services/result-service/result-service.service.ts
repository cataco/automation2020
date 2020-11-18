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
  getVrtImages(id) {
    //return this.httpService.getRequestWithoutParRoot('vrt-reports-' + id).map(
    return this.httpService.getRequestWithoutPar('image-reports/report/' + id).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

}
