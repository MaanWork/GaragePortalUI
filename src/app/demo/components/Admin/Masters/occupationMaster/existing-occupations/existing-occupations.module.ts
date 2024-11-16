
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
import { ExistingOccupationsRoutingModule } from './existing-occupations-routing.module';
import { ExistingOccupationsComponent } from './existing-occupations.component';
import { NewOccupationDetailsComponent } from '../new-occupation-details/new-occupation-details.component';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
// import { CompanyService } from '../../../loginCreation/Company/company.service';





@NgModule({
  declarations: [
    ExistingOccupationsComponent,
    NewOccupationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
   
    ExistingOccupationsRoutingModule,
  
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
  bootstrap: [ExistingOccupationsComponent],
  providers: [
    CurrencyPipe,
    // CompanyService,
  ],
})
export class ExistingOccupationsModule { }
