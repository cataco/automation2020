import { Component, OnInit } from '@angular/core';
import * as resemble from 'resemblejs';
import { ResultService } from '../../services/result-service/result-service.service';


class Resulta {
  id: any;
  imagen1: any;
  imagen2: any;
  resultado: any;
  diferencia: any;
  test: any;
}

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
  //reports = [];
  public reports: Array<Resulta> = [];



  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.resultService.getVrtResult().subscribe(response => {
      console.log('results->', response);
      if (response){

         response.forEach(dataItem => {
           const res = new Resulta();
           res.id = dataItem.id;
           res.imagen1 = dataItem.image1;
           res.imagen2 = dataItem.image2;
           res.test = dataItem.test;
           this.reports.push(res);
         });
       // this.reports = response;
      }
    });
  }

  // tslint:disable-next-line:typedef
  generateResemble(id){
    const report = this.getImages(id);
    const diff = resemble(report.imagen1)
      .compareTo(report.imagen2).onComplete(this.getDiff);
    report.diferencia = sessionStorage.getItem('result');
    report.resultado = sessionStorage.getItem('imagen');
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
