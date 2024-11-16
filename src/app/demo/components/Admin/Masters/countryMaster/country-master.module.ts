
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { CountryListComponent } from './country-list/country-list.component';
import { MastersService } from '../Masters.service';
import { NewCountryDetailsComponent } from './new-country-details/new-country-details.component';
import { CountryMasterRoutingModule } from './country-master-routing.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';





@NgModule({
  declarations: [
    CountryListComponent,
    NewCountryDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    RadioButtonModule,
    DropdownModule,
    CountryMasterRoutingModule,
    TableModule,
    MaterialModule,
    PipesModule,
    // DigitOnlyModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,

  ],
  bootstrap: [CountryListComponent],
  providers: [
    CurrencyPipe,
    MastersService
  ],
})
export class CountryMasterModule { }
