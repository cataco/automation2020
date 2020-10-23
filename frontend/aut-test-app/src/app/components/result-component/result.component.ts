import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TestScheduler } from 'rxjs-compat';
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
    this.getMovilReport();
  }

  // tslint:disable-next-line:typedef
  getReport() {
    this.resultService.getReportResult().subscribe(
      response => {
        this.stats = response.stats;
        if (response.results.length > 0) {
          this.testTittle = response.results[0].suites[0].title;
          this.testList = response.results[0].suites[0].tests;
        }
      }, error => {
        console.log('error getReportResult', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getMovilReport() {
    this.resultService.getMovilReportResult().subscribe(
      response => {
        console.log('response=>', response);
        this.testTittle = response.collectors[0].result[0].nodeid;
        this.stats =
        {
          duration: response.duration * 1000,
          tests: response.summary.total,
          failures: response.summary.failed,
          passes: response.summary.passed,
        };
        let tests = Array();
        response.tests.forEach(element => {
          const test = {
            pass: element.outcome === 'passed' ? true : false,
            title: element.nodeid,
            duration: (element.setup.duration + element.call.duration + element.teardown.duration) * 1000,
            err: { message: element.call.crash !== undefined ? element.call.crash.message : '' }

          };
          tests.push(test);

        });
        this.testList = tests;
      }, error => {
        console.log('error getMovilReport', error);
      }
    );
  }
}
