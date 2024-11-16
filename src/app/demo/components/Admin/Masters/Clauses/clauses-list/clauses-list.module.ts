
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
import { ClausesListComponent } from './clauses-list.component';
import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
import { ClausesListRoutingModule } from './clauses-list-routing.module';
import { AddClausesDerailsComponent } from '../add-clauses-derails/add-clauses-derails.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';







@NgModule({
  declarations: [
    ClausesListComponent,
    NewClausesDetailsComponent,
    AddClausesDerailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ClausesListRoutingModule,
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
  bootstrap: [ClausesListComponent],
  providers: [
    CurrencyPipe,
   // ProductDetailsService,
  ],
})
export class ClausesListModule { }
