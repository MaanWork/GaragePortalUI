import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrderComponent } from './work-order/work-order.component';
import { DamageDetailsComponent } from './damage-details/damage-details.component';
import { TotalAmountComponent } from '../../surveyor/total-amount/total-amount.component';
import { DealerComponent } from './dealer-home/dealer.component';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
// { VieQuoteDetailsComponent } from './viewquote-details.component';



const routes: Routes = [
  {
    path: '',
    component: DealerComponent,
  },
  {
    path: 'workorder',
    component: WorkOrderComponent,
  },
  {
    path: 'damagedetail',
    component: DamageDetailsComponent,
  },
  {
    path: 'totalamount',
    component: TotalAmountComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dealerRoutingModule {}
