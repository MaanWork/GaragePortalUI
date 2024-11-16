
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { BodyTypeListRoutingModule } from './body-type-list-routing.module';
import { BodyTypeListComponent } from './body-type-list.component';
import { NewBodyTypeDetailsComponent } from '../new-body-type-details/new-body-type-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BankListRoutingModule } from '../../Bank/bank-list/bank-list-routing.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';









@NgModule({
  declarations: [

    BodyTypeListComponent,
    NewBodyTypeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MaterialModule,
    PipesModule,
    RadioButtonModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,
    BodyTypeListRoutingModule
  ],
  bootstrap: [BodyTypeListComponent],
  providers: [
    CurrencyPipe,
    //ProductDetailsService,
  ],
})
export class BodyTypeListModule { }
