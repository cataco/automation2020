// @ts-ignore
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateService } from '../../services/create-service/create.service';
import Swal from "sweetalert2";
import { PruebaService } from "../../prueba.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";

// @ts-ignore
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  files: any = [];
  panelOpenState = false;
  progress = 0;
  public registerForm: FormGroup;

  constructor(private service: PruebaService, private createService: CreateService) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appUrl: new FormControl('', [Validators.required]),
      appVersion: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      strategy: new FormControl('1'),
      testScript: new FormControl(''),
      stepsScript: new FormControl(''),
      features: new FormControl(''),
      eventos: new FormControl('')
    });
  }

  // tslint:disable-next-line:typedef
  crearMonkey() {
    const data = { eventos: this.registerForm.get('eventos'), url:  this.registerForm.get('url')};
    this.createService.createMonkeyTest(data).subscribe(
      response => {
        console.log('response=>', response);
      }, error => {
        console.log('error creando ramdon-test', error);
      }
    );
  }

    uploadFile() {
      console.log('files lengt', this.files.length);
      this.service.saveFiles(this.registerForm).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Video subido satisfactoriamente!', event.body);
            Swal.fire('Success!', 'Prueba ejecutada satisfactoriamente', 'success');
            this.progress = 0;
            this.files.splice(0, 1)
        }
      }, error => {
        console.log('Error registrandose-> ', error);
        Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
        this.progress = 0;
      });
    }

    uploadFileBDD() {
      //console.log('files lengt', this.files.length);
      this.service.saveFilesBDD(this.registerForm).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Video subido satisfactoriamente!', event.body);
            Swal.fire('Success!', 'Prueba ejecutada satisfactoriamente', 'success');
            this.progress = 0;
            this.files.splice(0, 1)
        }
      }, error => {
        console.log('Error registrandose-> ', error);
        Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
        this.progress = 0;
      });
    }

    subirScript(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log('logo_asamblea', event.target.files[0])
        this.registerForm.get('testScript').setValue(file);
      }
    }

    subirFeatures(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log('logo_asamblea', event.target.files[0])
        this.registerForm.get('features').setValue(file);
      }
    }

    subirSteps(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log('logo_asamblea', event.target.files[0])
        this.registerForm.get('stepsScript').setValue(file);
      }
    }
  }
