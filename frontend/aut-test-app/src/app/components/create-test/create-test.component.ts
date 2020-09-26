// @ts-ignore
import {Component, OnInit, ViewChild} from '@angular/core';
import { CreateService } from '../../services/create-service/create.service';

// @ts-ignore
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
   panelOpenState = false;
   eventos = '';
   url = '';
   name = '';
   appName = '';
   appUrl = '';
   appVersion = '1';
   framework = '1';
   strategy = '1';


   constructor(private createService: CreateService) { }


  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  crearMonkey(){
    const data = {eventos: this.eventos, url: this.url };
    this.createService.createMonkeyTest(data).subscribe(
      response => {
        console.log('response=>', response);
      }, error => {
        console.log('error creando ramdon-test', error);
      }
    );
  }
}
