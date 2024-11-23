
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { LoginCreationRoutingModule } from './login-creation-routing.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrokerComponent } from './broker/broker.component';
import { InsurenceEmpComponent } from './insurence-emp/insurence-emp.component';
import { LoginCreationComponent } from './login-creation.component';
import { UserComponent } from './user/user.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { MaterialModule } from 'src/app/material/material.module';
import { PickListModule } from 'primeng/picklist';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';
import { CreateSurveyorComponent } from './create-surveyor/create-surveyor.component';
import { LoginFormComponent } from './login-form/login-form.component';
@NgModule({
  declarations: [
    LoginCreationComponent,
    UserComponent,
    InsurenceEmpComponent,
    BrokerComponent,
    CreateAdminComponent,
    CreateSurveyorComponent,
    CreateDealerComponent,
    CreateGarageComponent,
    LoginFormComponent,

    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    LoginCreationRoutingModule,
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
    OverlayPanelModule,
    InputSwitchModule,
    ToggleButtonModule,
    MultiSelectModule,
    MaterialModule,
    PickListModule
  ],
  bootstrap: [],
  providers: [
    CurrencyPipe
  ],
})
export class LoginCreationModule { }
