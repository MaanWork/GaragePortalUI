
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { MastersService } from '../Masters.service';
import { SmsDetailsComponent } from './sms-details/sms-details.component';
import { SmsListComponent } from './sms-list/sms-list.component';
import { SmsMasterRoutingModule } from './sms-master-routing.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
//import { ColorMasterRoutingModule } from './color-master-routing-module';
//import {SmsMasterRoutingModule} from './sms-master-routing.module'





@NgModule({
  declarations: [
    SmsListComponent,
    SmsDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    SmsMasterRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [SmsListComponent],
  providers: [
    CurrencyPipe,
    MastersService
  ],
})
export class SmsMasterModule { }
