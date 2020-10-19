import { Component, OnInit } from '@angular/core';
import * as resemble from 'resemblejs';

@Component({
  selector: 'app-result-vrt',
  templateUrl: './result-vrt.component.html',
  styleUrls: ['./result-vrt.component.css']
})
export class ResultVrtComponent implements OnInit {

  diferencia;
  imagen;
  constructor() { }

  ngOnInit(): void {
    this.getImages();
  }

  // tslint:disable-next-line:typedef
  getImages() {
    const diff = resemble('http://127.0.0.1:8887/test1.jpeg')
      .compareTo('http://127.0.0.1:8887/test2.jpeg').onComplete(this.getDiff);
    this.diferencia = sessionStorage.getItem('result').replaceAll('"', '');
    this.imagen = sessionStorage.getItem('imagen');
}

// tslint:disable-next-line:typedef
getDiff(data){
  console.log(data);
  sessionStorage.setItem('result', JSON.stringify(data.misMatchPercentage));
  sessionStorage.setItem('imagen', data.getImageDataUrl());
}


}
