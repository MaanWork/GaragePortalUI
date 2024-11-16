import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
import { ApproverPortfolioComponent } from './approverportfolio.component';
import { ApproverPortfolioNewComponent } from './approver-portfolio-new/approver-portfolio-new.component';




const routes: Routes = [
  {
    path: '',
    component: ApproverPortfolioComponent,
  },
  {
    path: 'NewDetails',
    component: ApproverPortfolioNewComponent,
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproverRoutingModule {}
