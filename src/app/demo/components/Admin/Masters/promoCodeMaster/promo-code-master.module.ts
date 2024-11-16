
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { MastersService } from '../Masters.service';
import { PromoCodeListComponent } from './promo-code-list/promo-code-list.component';
import { NewPromoCodeDetailsComponent } from './new-promo-code-details/new-promo-code-details.component';
import { PromoCodeMasterRoutingModule } from './promo-code-master-routing.module';
import { ViewPromoDiscountDetailsComponent } from './view-promo-discount-details/view-promo-discount-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
// import { ProductDetailsService } from '../../loginCreation/Company/product-details/product-details.service';




@NgModule({
  declarations: [
    PromoCodeListComponent,
    NewPromoCodeDetailsComponent,
    ViewPromoDiscountDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PromoCodeMasterRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [PromoCodeListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService
  ],
})
export class PromoCodeMasterModule { }
