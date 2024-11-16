
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// // import { DigitOnlyModule } from '@uiowa/digit-only';
// import { DirectivesModule } from '../../../../shared/Directives/directives.module';
// //import { ThemeModule } from '../../../../../@theme/theme.module';
// import { TablesModule } from '../../../../shared/Tables/tables.module';
// import { MaterialModule } from '../../../../shared/material/material.module';
// import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { ViewPromoCoverDetailsComponent } from './view-promo-cover-details.component';
import { ViewPromoCoverDetailsRoutingModule } from './view-promo-cover-details-routing.module';
import { MastersService } from '../../Masters.service';
import { EditPromoCoverDetailsComponent } from '../edit-promo-cover-details/edit-promo-cover-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';




@NgModule({
  declarations: [
    ViewPromoCoverDetailsComponent,
    EditPromoCoverDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    //ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    ViewPromoCoverDetailsRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    //NbMomentDateModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [ViewPromoCoverDetailsComponent],
  providers: [
    CurrencyPipe,
    MastersService
  ],
})
export class ViewPromoCoverDetailsModule { }
