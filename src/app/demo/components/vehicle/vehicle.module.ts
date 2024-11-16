import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';



@NgModule({
  declarations: [VehicleTableComponent, VehicleCreateFormComponent],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    BreadcrumbModule,
    DividerModule,
    CheckboxModule,
    SplitButtonModule,
    InputTextModule,
    SpeedDialModule,
    SelectButtonModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    ConfirmDialogModule,
    AccordionModule,
    ChipModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class VehicleModule { }
