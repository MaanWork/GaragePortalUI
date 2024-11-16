import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditControllerComponent } from './credit-Controller.component';
import { CreditControllerInfoComponent } from '../credit-controller-info/credit-Controller.component';

const routes: Routes = [
  { 
    path: '', 
    component: CreditControllerComponent, 
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
    component: CreditControllerInfoComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditControllerRoutingModule { }
