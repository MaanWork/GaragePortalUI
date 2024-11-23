import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SparePartsHomeComponent } from './spare-parts-home.component';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
// { VieQuoteDetailsComponent } from './viewquote-details.component';



const routes: Routes = [
  {
    path: '',
    component: SparePartsHomeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SparePartsHomeRoutingModule {}
