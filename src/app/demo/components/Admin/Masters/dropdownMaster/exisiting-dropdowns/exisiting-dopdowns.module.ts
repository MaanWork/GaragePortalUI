import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//mport { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { ExisitingDropdownsComponent } from './exisiting-dropdowns.component';


import { NewDropdownDetailsComponent } from '../new-dropdown-details/new-dropdown-details.component';
import { ExistingDropdownsRoutingModule } from './exisiting-dropdowns-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';






@NgModule({
  declarations: [
    ExisitingDropdownsComponent,
    NewDropdownDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ExistingDropdownsRoutingModule,
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
  bootstrap: [ExisitingDropdownsComponent],
  providers: [
    CurrencyPipe,

  ],
})
export class ExistingDropdownsModule { }
