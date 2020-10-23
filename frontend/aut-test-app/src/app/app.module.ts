import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { ResultComponent } from './components/result-component/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { BannerComponent } from './components/banner/banner.component';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {AppRoutingModule} from "./app-routing.module";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import { ResultVrtComponent } from './components/result-vrt/result-vrt.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    CreateTestComponent,
    BannerComponent,
    ResultVrtComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
