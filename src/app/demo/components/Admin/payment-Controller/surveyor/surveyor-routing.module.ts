import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  SurveyorComponent } from './surveyor.component';
import { SurveyorInfoComponent } from '../surveyor-controller-info/surveyor-Controller.component';

const routes: Routes = [
  { 
    path: '', 
    component: SurveyorComponent, 
    // children: [
    //   { path: 'vehicle', component: VehiclePlanComponent },
    //   { path: 'accessories', component: AccesoriesComponent },
    //   { path: 'quote-type', component: QuotationTypeInfoComponent },
      
    //   { path: 'driver-info', component: DriverInfoComponent },
    //   { path: 'document-info', component: DocumentInfoComponent },
    //   { path: 'payment', component: PaymentInfoComponent },
    //   { path: 'policy-info', component: PolicyInfoComponent },
    // ] 
  },
  { 
    path: 'Info', 
    component: SurveyorInfoComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyorRoutingModule { }
