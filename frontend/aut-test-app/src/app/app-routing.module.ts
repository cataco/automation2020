import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateTestComponent} from './components/create-test/create-test.component';
import {ResultComponent} from './components/result-component/result.component';



const routes: Routes = [
  {path: 'create', component: CreateTestComponent},
  {path: 'results', component: ResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
