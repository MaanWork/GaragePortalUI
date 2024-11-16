import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { EndorsementComponent } from './endorsement/endorsement.component';
import { EndorsementTypeComponent } from './endorsement-type/endorsement-type.component';
import { TreeModule } from 'primeng/tree';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    PortfolioComponent,EndorsementComponent, EndorsementTypeComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule,
    TableModule,
    MenuModule,
    TreeModule,
    AccordionModule,
    MaterialModule,
    RadioButtonModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class PortfolioModule { }
