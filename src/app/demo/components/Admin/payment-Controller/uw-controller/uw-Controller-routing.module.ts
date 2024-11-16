import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditControllerInfoComponent } from '../credit-controller-info/credit-Controller.component';
import { UWControllerComponent } from './uw-Controller.component';
import { UWInfoComponent } from '../uw-controller-info/uw-Controller.component';

const routes: Routes = [
  { 
    path: '', 
    component: UWControllerComponent, 
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
    component: UWInfoComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UWControllerRoutingModule { }
