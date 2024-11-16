import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrmHomeComponent } from "../../crm-home/crm-home.component";
import { CrmCustomerComponent } from "./crm-customer.component";

const routes: Routes = [
  { 
    path: '', 
    component: CrmHomeComponent, 
    
  },
  { 
    path: 'Lead', 
    component: CrmCustomerComponent, 
    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMHomeRoutingModule { }
