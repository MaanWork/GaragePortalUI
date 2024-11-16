
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length

// import { NbMomentDateModule } from '@nebular/moment';
// import { DigitOnlyModule } from '@uiowa/digit-only';

// import { DirectivesModule } from '../../../../shared/Directives/directives.module';
// // import { ThemeModule } from '../../../../../../../@theme/theme.module';
// import { TablesModule } from '../../../../shared/Tables/tables.module';
// import { MaterialModule } from '../../../../shared/material/material.module';
// import { PipesModule } from '../../../../shared/pipes/pipes.module';
// import { ProductDetailsService } from '../../loginCreation/Company/product-details/product-details.service';
import { ErrorListComponent } from './ErrorModule-list/error-list.component';
import { ErroristRoutingModule } from './error-list-routing.module';
import { NewErrorDetailsComponent } from './ErrorModule-details/error-details.component';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ErrorListComponent,
    NewErrorDetailsComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ErroristRoutingModule,
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
  bootstrap: [ErrorListComponent],
  providers: [
    CurrencyPipe,
    // ProductDetailsService,
  ],
})
export class EmiListModule { }
