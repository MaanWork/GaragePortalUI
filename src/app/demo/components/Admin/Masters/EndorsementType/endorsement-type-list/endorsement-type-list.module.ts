
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
import { EndorsementTypeListComponent } from './endorsement-type-list.component';
import { NewEndorsementTypeDetailsComponent } from '../new-endorsement-type-details/new-endorsement-type-details.component';
import { EndorsementTypeListRoutingModule } from './endorsement-type-list-routing.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';








@NgModule({
  declarations: [

    EndorsementTypeListComponent,
    NewEndorsementTypeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    EndorsementTypeListRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [EndorsementTypeListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class EndorsementTypeListModule { }
