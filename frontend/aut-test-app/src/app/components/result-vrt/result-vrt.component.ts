import { Component, OnInit } from '@angular/core';
import * as resemble from 'resemblejs';
import { ResultService } from '../../services/result-service/result-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

class Resulta {
  image: any;
  diferencia: any;
}

@Component({
  selector: 'app-result-vrt',
  templateUrl: './result-vrt.component.html',
  styleUrls: ['./result-vrt.component.css']
})

export class ResultVrtComponent implements OnInit {

  reportsAll: Array<any> = [];
  reportsBase: Array<any> = [];
  reportsDiff: Array<any> = [];
  reportForm: FormGroup;
  // reports = [];
  imagesBase: string[];
  imagesDiff: string[];
  imagesCompare: Array<Resulta> = [];



  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.createForm();
    this.resultService.getReportResult().subscribe(response => {
      if (response) {
        this.reportsAll = response;
      }

      this.reportsAll.forEach(repo => {
        this.reportsDiff.push(repo);
        this.reportsBase.push(repo);
      });
    });
  }

  // tslint:disable-next-line:typedef
  createForm() {
    this.reportForm = new FormGroup({
      reportModif: new FormControl('', [Validators.required]),
      reportBase: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  generateResemble() {
    let index = 0;
    this.imagesBase.forEach(report => {
    const result = new Resulta();
    const diff = resemble(report)
      .compareTo(this.imagesDiff[index]).onComplete(this.getDiff);
    result.diferencia = localStorage.getItem('result');
    result.image = localStorage.getItem('imagen');
    this.imagesCompare.push(result);
    index++;
    localStorage.clear();
    });
  }

  // tslint:disable-next-line:typedef
  getDiff(data) {
    console.log(data);
    localStorage.setItem('result', JSON.stringify(data.misMatchPercentage));
    localStorage.setItem('imagen', data.getImageDataUrl());
  }


  // tslint:disable-next-line:typedef
  getImageReportBase(event) {
    const id = event.value;
    // Borra todas los reportes
    this.reportsDiff = [];

    // vuelve a llenar el array
    this.reportsAll.forEach(repo => {
      this.reportsDiff.push(repo);
    });

    const index = this.reportsAll.indexOf(this.reportsAll.filter(repo => repo.id === id)[0]);
    this.reportsDiff.splice(index, 1);
    this.resultService.getVrtImages(id).subscribe(response => {
      if (response) {
        response.forEach(dataItem => {
          this.imagesBase.push(dataItem.image);
        });
      }
    });
  }


  // tslint:disable-next-line:typedef
  getImageReportDiff(event) {
    const id = event.value;

    // Borra todas los reportes
    this.reportsBase = [];

    // vuelve a llenar el array
    this.reportsAll.forEach(repo => {
      this.reportsBase.push(repo);
    });

    const index = this.reportsAll.indexOf(this.reportsAll.filter(repo => repo.id === id)[0]);

    this.reportsBase.splice(index, 1);

    this.resultService.getVrtImages(id).subscribe(response => {
      if (response) {
        response.forEach(dataItem => {
          this.imagesDiff.push(dataItem.image);
        });
      }
    });
  }

}
