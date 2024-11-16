
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import {RegionListComponent} from './region-list/region-list.component';
import {RegionRoutingModule} from './region-routing.module';
import { NewRegiondetailsComponent } from './new-regiondetails/new-regiondetails.component';
import { AddRegionDetailsComponent } from './add-region-details/add-region-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
// import { CompanyService } from '../../loginCreation/Company/company.service';



@NgModule({
  declarations: [
    RegionListComponent,
    NewRegiondetailsComponent,
    AddRegionDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    RegionRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [RegionListComponent],
  providers: [
    CurrencyPipe,
    // CompanyService
  ],
})
export class RegionModule { }
