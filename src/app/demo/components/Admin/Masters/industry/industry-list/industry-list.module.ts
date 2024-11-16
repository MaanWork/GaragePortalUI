
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
//import { EmiListComponent } from './emi-list.component';
import { IndustryListComponent } from './industry-list.component';
//import { IndustryDetailsComponent } from './industry-details/industry-details.component';
import { IndustryDetailsComponent } from '../industry-details/industry-details.component';
//import { IndustryDetailsComponent } from '..industry-details.component';
import { IndustryListRoutingModule } from './industry-list-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
//import { NewEmidetailsComponent } from '../new-emidetails/new-emidetails.component';
//import { EmiListRoutingModule } from './emi-list-routing.module';







@NgModule({
  declarations: [
    IndustryListComponent,
    IndustryDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    IndustryListRoutingModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,
    RadioButtonModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,
  ],
  bootstrap: [IndustryListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class IndustryListModule { }
