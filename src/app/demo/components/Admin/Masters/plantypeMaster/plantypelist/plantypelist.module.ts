import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';

import { PlanTypeDetails } from '../plantypedetails/plantypedetails.component';
import { PlanTypeListComponent } from './plantypelist.component';
import { PlanTypeRoutingModule } from './plantypelist-routing.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    PlanTypeDetails,
    PlanTypeListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PlanTypeRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [PlanTypeListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})

export class PlanTypeModule { }
