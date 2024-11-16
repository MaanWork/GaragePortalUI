import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { CompanyService } from '../../loginCreation/Company/company.service';
//import { ColorListComponent } from './color-list/color-list.component';
import { ModelListComponent } from './model-list/model-list.component';
//import { ColorMasterRoutingModule } from './color-master-routing-module';
import { modelMasterRoutingModule } from './model-master-routing-module';
import { NewmodelDetailsComponent } from './newmodel-details/newmodel-details.component';
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
//import { NewcolorDetailsComponent } from './newcolor-details/newcolor-details.component';

@NgModule({
  declarations: [
    ModelListComponent,
    NewmodelDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    modelMasterRoutingModule,
    TableModule,
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
  bootstrap: [ModelListComponent],
  providers: [
    CurrencyPipe,
    // CompanyService,
  ],
})
export class ModelMasterModule { }
