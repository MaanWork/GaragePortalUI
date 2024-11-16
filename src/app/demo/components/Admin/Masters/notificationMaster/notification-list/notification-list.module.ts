
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
import { NotificationListRoutingModule } from './notification-list-routing.module';
//import { ClausesListComponent } from './noti-list.component';
//import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
//import { ClausesListRoutingModule } from './noti-list-routing.module';
import { NotificationListComponent } from './notification-list.component';
import { NewNotificationDetailsComponent } from '../new-notification-details/new-notification-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';







@NgModule({
  declarations: [
    NotificationListComponent,
    NewNotificationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NotificationListRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,

  ],
  bootstrap: [NotificationListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class NotificationListModule { }
