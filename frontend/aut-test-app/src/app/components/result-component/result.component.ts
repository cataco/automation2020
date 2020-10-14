import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result-service/result-service.service';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  testList: Array<any>;
  testTittle: string;
  stats: any;
  panelOpenState: boolean;

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.getReport();
  }

  // tslint:disable-next-line:typedef
  getReport() {
    this.resultService.getReportResult().subscribe(
      response => {
        if (response.length > 0) {
          console.log('response=>', response);
          this.testTittle = response[0].suites[0].title;
          this.testList = response[0].suites[0].tests;
        }
      }, error => {
        console.log('error getUser', error);
      }
    );
  }

}
