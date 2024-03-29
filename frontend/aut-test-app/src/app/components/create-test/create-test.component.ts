// @ts-ignore
import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {PruebaService} from '../../services/prueba-service/prueba.service';
import {UtilsService} from '../../services/util-service/utils.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// @ts-ignore
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  files: any = [];
  mobileVersion: [];
  panelOpenState = false;
  progress = 0;
  strategies: any;
  public registerForm: FormGroup;
  public mobileForm: FormGroup;
  versions: any;
  browsers: any;
  frameworks: any;

  constructor(private service: PruebaService, private utilService: UtilsService) {

  }

  ngOnInit(): void {
    this.utilService.getBrowsers().subscribe(response => {
      console.log('browsers: ', response);
      this.browsers = response;
    });

    this.utilService.getFrameworks().subscribe(response => {
      console.log('frameworks: ', response);
      this.frameworks = response;
    });

    this.utilService.getStrategies().subscribe(response => {
      console.log('strategies: ', response);
      this.strategies = response;
    });
    this.utilService.getAndroidVersion().subscribe(response => {
      console.log('AndroidVersion: ', response);
      this.mobileVersion = response;
    });
    this.getFrameworks();
    this.getBrowsers()
    this.getVersions();
    this.getStrategies();
    this.createForm();
    this.createMobileForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appUrl: new FormControl('', [Validators.required]),
      appVersion: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      strategy: new FormControl(''),
      browser: new FormControl(''),
      framework: new FormControl(''),
      testScript: new FormControl(''),
      url1: new FormControl(''),
      url2: new FormControl(''),
      events: new FormControl(''),
      stepsScript: new FormControl(''),
      features: new FormControl(''),
      androidVersion: new FormControl(''),
      apk: new FormControl(''),
      sripts: new FormControl(''),
    });
  }

  createMobileForm() {
    this.mobileForm = new FormGroup({
      appName: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      appVersion: new FormControl('', [Validators.required]),
      appApk: new FormControl('',),
      testScript: new FormControl(''),
      strategy: new FormControl(''),
      androidVersion: new FormControl(''),
      packageName: new FormControl(''),
      eventsNumber: new FormControl(''),
    });
  }

  getFrameworks() {
    this.service.getFrameworks().subscribe(data => {
      this.frameworks = data;
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  getStrategies() {
    this.service.getStrategies().subscribe(data => {
      this.strategies = data;
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  getBrowsers() {
    this.service.getBrowsers().subscribe(data => {
      this.browsers = data;
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  getVersions() {
    this.service.getAndroidVer().subscribe(data => {
      this.versions = data;
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  runE2E() {
    console.log('files lengt', this.files.length);
    this.service.runE2EMobile(this.mobileForm).subscribe((event: HttpEvent<any>) => {
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
      console.log('Error registrandose-> ', error.error);
      Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
      this.progress = 0;
    });
  }


  // tslint:disable-next-line:typedef
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
      console.log('Error registrandose-> ', error.error);
      Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
      this.progress = 0;
    });
  }

  runVrt() {
    console.log('files lengt', this.files.length);
    this.service.runVrt(this.registerForm).subscribe((event: HttpEvent<any>) => {
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
      console.log('Error registrandose-> ', error.error);
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
      console.log('Error registrandose-> ', error.error);
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

  subirMobileScript(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.mobileForm.get('testScript').setValue(file);
    }
  }

  subirApkScript(evento) {
    if (evento.target.files.length > 0) {
      const file = evento.target.files[0];
      console.log('logo_asamblea', evento.target.files[0])
      this.mobileForm.get('appApk').setValue(file);
    }
  }

  subirFeatures(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.registerForm.get('features').setValue(file);
    }
  }

  subirApk(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.registerForm.get('apk').setValue(file);
    }
  }

  subirSteps(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.registerForm.get('stepsScript').setValue(file);
    }
  }

  runMobileRandom() {
    this.service.runRandomMobile(this.mobileForm).subscribe((event: HttpEvent<any>) => {
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
      console.log('Error registrandose-> ', error.error);
      Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
      this.progress = 0;
    });
  }

  subirVrt(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.registerForm.get('sripts').setValue(file);
    }
  }
}
