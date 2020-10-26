import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TestScheduler } from 'rxjs-compat';
import { letProto } from 'rxjs-compat/operator/let';
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
  reports: any;
  reportsShow = new Array();

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.getReport();
  }

  // tslint:disable-next-line:typedef
  getReport() {
    this.resultService.getReportResult().subscribe(
      response => {
        this.reports = response;
        this.getMovilReport();
        this.reports.forEach(element => {
          const reporte = JSON.parse(element.testResults);
          console.log(reporte);
          if (reporte.results) {
            const report = {
              stats : reporte.stats,
              testTittle: reporte.results[0].suites[0].title,
              testList: reporte.results[0].suites[0].tests
            };
            this.reportsShow.push(report);
          }
        });
      }, error => {
        console.log('error getReportResult', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getMovilReport() {
    console.log('response=>', this.reports);
    this.reports.forEach(element => {
      const reporte = JSON.parse(element.testResults);
      console.log('reporte =>', reporte);
      if (reporte.collectors) {
        const stats =
        {
          duration: reporte.duration * 1000,
          tests: reporte.summary.total,
          failures: reporte.summary.failed,
          passes: reporte.summary.passed,
        };

        let tests = Array();
        reporte.tests.forEach(element1 => {
          const test = {
            pass: element1.outcome === 'passed' ? true : false,
            title: element1.nodeid,
            duration: (element1.setup.duration + element1.call.duration + element1.teardown.duration) * 1000,
            err: { message: element1.call.crash !== undefined ? element1.call.crash.message : '' }

          };
          tests.push(test);

        });
        const testList = tests;
        const report = {stats, testList, testTittle: reporte.collectors[0].result[0].nodeid};
        this.reportsShow.push(report);

      }
    });
  }
}
