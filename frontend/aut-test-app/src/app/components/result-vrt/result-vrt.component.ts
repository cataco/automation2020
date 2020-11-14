import { Component, OnInit } from '@angular/core';
import * as resemble from 'resemblejs';
import { ResultService } from '../../services/result-service/result-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

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
  imagesBase: Array<string> = [];
  imagesDiff: Array<string> = [];
  imagesCompare: Array<Resulta> = [];
  index = 0;
  showImages = false;
  url = environment.urlRoot;



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
    this.showImages = true;
    localStorage.clear();
    this.imagesBase.forEach(report => {
    resemble(report)
      // tslint:disable-next-line:typedef
      .compareTo(this.imagesDiff[this.index]).onComplete(function(data){
        this.index = localStorage.getItem('index');
        if (this.index == null){
          this.index = 0;
        }
        localStorage.setItem('result-' + this.index, JSON.stringify(data.misMatchPercentage));
        localStorage.setItem('imagen-' + this.index, data.getImageDataUrl());
        this.index++;
        localStorage.setItem('index', this.index);
     });
    });
  }

  // tslint:disable-next-line:typedef
  showDiff(){
    this.imagesCompare = [];
    let index = 0;
    this.imagesBase.forEach(report => {
      const result = new Resulta();
      result.diferencia = localStorage.getItem('result-' + index);
      result.image = localStorage.getItem('imagen-' + index);
      this.imagesCompare.push(result);
      index++;
    });
  }

  // tslint:disable-next-line:typedef
  getImageReportBase(event) {
    this.showImages = false;
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
      console.log(response);
      if (response.length > 0) {
        response.forEach(dataItem => {
        this.imagesBase.push(this.url + dataItem.image);
        });
      }else{
        alert('Imagenes no encontradas');
      }
    }, error => {
      alert('Imagenes no encontradas');
    });
  }


  // tslint:disable-next-line:typedef
  getImageReportDiff(event) {
    this.showImages = false;
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
      if (response.length > 0) {
        response.forEach(dataItem => {
          this.imagesDiff.push(this.url + dataItem.image);
        });
      }else{
        alert('Imagenes no encontradas');
      }
    }, error => {
      alert('Imagenes no encontradas');
    });
  }

}
