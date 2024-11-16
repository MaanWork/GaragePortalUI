import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePlanComponent } from './vehicle-plan/vehicle-plan.component';
import { QuotationPlanComponent } from './quotation-plan.component';
import { AccesoriesComponent } from './accesories/accesories.component';
import { QuotationTypeInfoComponent } from './quotation-type-info/quotation-type-info.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { PolicyInfoComponent } from './policy-info/policy-info.component';
import { ExcessDiscountComponent } from './excess-discount/excess-discount.component';
import { PersonalQuoteDetailsComponent } from './personal-quote-details/personal-quote-details.component';
import { CommonProductDetailsComponent } from './common-product-details/common-product-details.component';
import { RiskDetailsComponent } from './Riskpage/Riskdetails.component';
import { CopyQuoteComponent } from './copyQuote/copyquote.component';
import { ShortQuoteComponent } from './short-quote/short-quote.component';
import { TravelQuoteDetailsComponent } from './travel-quote-details/travel-quote-details.component';
import { OTPComponent } from '../../auth/login/otp/otp.component';
import { HomePremiumComponent } from './home-premium/home-premium.component';

const routes: Routes = [
  { 
    path: 'main', 
    component: QuotationPlanComponent, 
    children: [
      { path: 'vehicle', component: VehiclePlanComponent },
      { path: 'accessories', component: AccesoriesComponent },
      { path: 'quote-type', component: QuotationTypeInfoComponent },
      
      { path: 'driver-info', component: DriverInfoComponent },
      { path: 'document-info', component: DocumentInfoComponent },
      { path: 'payment', component: PaymentInfoComponent },
      { path: 'policy-info', component: PolicyInfoComponent },
    ] 
  },
  { path: 'motor-details', component: VehicleCreateFormComponent },
  { path: 'premium-info', component: ExcessDiscountComponent },
  { path: 'quote-details', component:  CommonProductDetailsComponent},
  { path: 'quote-details#', component:  CommonProductDetailsComponent},
  { path: 'risk-page', component: RiskDetailsComponent },
  { path: 'personal-quote-details', component: PersonalQuoteDetailsComponent },
  { path: 'copy-quote', component: CopyQuoteComponent },
  { path: 'homepremium', component: HomePremiumComponent },
  { 
    path: 'premium-details', 
    component: CoverDetailsComponent,
  },
  { 
    path: 'travel-quote-details', 
    component: TravelQuoteDetailsComponent,
  },
  { 
    path: 'OtpSection', 
    component: OTPComponent,
  },
  {path:"shortQuote" , component:ShortQuoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationPlanRoutingModule { }
