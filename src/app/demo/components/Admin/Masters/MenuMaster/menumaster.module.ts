
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { MenuNewDetailsComponent } from './Menu-details/menu-details.component';
import { MenuDetailsRoutingModule } from './menumaster-routing.module';
import { MenuListComponent } from './Menu-list/menu-list.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    MenuListComponent,
    MenuNewDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MenuDetailsRoutingModule,
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
    

  ],
  bootstrap: [MenuListComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class MenuListModule { }
