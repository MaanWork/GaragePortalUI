
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../../service/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { FormlyModule } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { LoginCreationComponent } from './login-creation/login-creation.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserComponent } from './login-creation/user/user.component';
import { InsurenceEmpComponent } from './login-creation/insurence-emp/insurence-emp.component';
import { BrokerComponent } from './login-creation/broker/broker.component';
import { MaterialModule } from 'src/app/material/material.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { ReInsuranceComponent } from './re-insurance/re-insurance.component';


@NgModule({
  declarations: [
    AdminComponent,
    ReInsuranceComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    AdminRoutingModule,
    PipesModule,
    NgxPaginationModule,
    HttpClientModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    ChipModule,
    AutoCompleteModule,
    RadioButtonModule,
    CardModule,
    TreeSelectModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    FormlyModule,
    CalendarModule,
    InputTextareaModule,
    BadgeModule,
    MaterialModule,
    MultiSelectModule,
    OverlayPanelModule
  ],
  bootstrap: [],
  providers: [
    CurrencyPipe
  ],
})
export class AdminModule { }
