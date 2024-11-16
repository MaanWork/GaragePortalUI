import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FnolHomeComponent } from './fnol-home/fnol-home.component';
import { CreateFNOLComponent } from './create-fnol/create-fnol.component';
import { FnolListingComponent } from './fnol-listing/fnol-listing.component';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
// { VieQuoteDetailsComponent } from './viewquote-details.component';



const routes: Routes = [
  {
    path: '',
    component: FnolHomeComponent,
  },
  {
    path: 'createfnol',
    component: CreateFNOLComponent,
  },
  {
    path: 'fnolListing',
    component: FnolListingComponent,
  },
  // {
  //   path: 'damagedetail',
  //   component: DamageDetailsComponent,
  // },
  // {
  //   path: 'totalamount',
  //   component: TotalAmountComponent,
  // },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FnolRoutingModule {}
