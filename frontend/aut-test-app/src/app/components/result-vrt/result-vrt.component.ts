import { Component, OnInit } from '@angular/core';
import * as resemble from 'resemblejs';
import { ResultService } from '../../services/result-service/result-service.service';

@Component({
  selector: 'app-result-vrt',
  templateUrl: './result-vrt.component.html',
  styleUrls: ['./result-vrt.component.css']
})
export class ResultVrtComponent implements OnInit {

  diferencia;
  imagen1;
  imagen2;
  imagenDiff;
  reports = [];
  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.getImages();
    this.resultService.getVrtResult().subscribe(response => {
      console.log('results->', response);
      if (response){
        this.reports = response;
      }
    });
  }

  // tslint:disable-next-line:typedef
  generateResemble(id){
    const report = this.getImages(id);
    const diff = resemble(report.imagen1)
      .compareTo(report.imagen2).onComplete(this.getDiff);
    this.diferencia = sessionStorage.getItem('result');
    this.imagenDiff = sessionStorage.getItem('imagen');


  }

  // tslint:disable-next-line:typedef
  getImages(id) {
    return this.reports.filter(report => report.id === id)[0];
}

// tslint:disable-next-line:typedef
getDiff(data){
  console.log(data);
  sessionStorage.setItem('result', JSON.stringify(data.misMatchPercentage));
  sessionStorage.setItem('imagen', data.getImageDataUrl());
}


}
