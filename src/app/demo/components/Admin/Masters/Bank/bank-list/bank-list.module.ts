
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { BankListComponent } from './bank-list.component';
import { NewBankDetailsComponent } from '../new-bank-details/new-bank-details.component';
import { BankListRoutingModule } from './bank-list-routing.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [

    BankListComponent,
    NewBankDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    BankListRoutingModule,
    MaterialModule,
    PipesModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,
     
  ],
  bootstrap: [BankListComponent],
  providers: [
    CurrencyPipe,
   // ProductDetailsService,
  ],
})
export class BankListModule { }
