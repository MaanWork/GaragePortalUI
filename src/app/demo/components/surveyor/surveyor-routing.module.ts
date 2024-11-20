import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrderComponent } from './work-order/work-order.component';
import { DamageDetailsComponent } from './damage-details/damage-details.component';
import { TotalAmountComponent } from './total-amount/total-amount.component';
import { SurveyorHomeComponent } from './surveyor-home/surveyor-home.component';
import { CompareQuoteComponent } from './compare-quote/compare-quote.component';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
// { VieQuoteDetailsComponent } from './viewquote-details.component';



const routes: Routes = [
  {
    path: '',
    component: SurveyorHomeComponent,
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
  {
    path: 'compareQuote/:ClaimNo',
    component: CompareQuoteComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class surveyorRoutingModule {}
