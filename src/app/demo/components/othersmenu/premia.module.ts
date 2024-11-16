
import { FormsModule } from '@angular/forms';
import { CommonModule,  CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PremiaIntegrationViewComponent } from './premiaintegration/premiaintegration-view.component';
import { PremiaIntegrationRoutingModule } from './premia-routing.module';
import { PremiaDetailsViewComponent } from './premiadetails/premiadetails-view.component';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PremiaIntegrationViewComponent,
    PremiaDetailsViewComponent 
  ],
  imports: [
    
        PremiaIntegrationRoutingModule,
        FormsModule,
        ChartModule,
        MenuModule, 
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DividerModule,
        CommonModule,
        BreadcrumbModule,
        InputTextModule,
        TabViewModule,
        SelectButtonModule,
        ToastModule,
        DropdownModule,
        AccordionModule,
        FieldsetModule,
        AvatarModule,
        TableModule,
        DynamicDialogModule,
        DialogModule,
        CalendarModule,
  ],
  bootstrap: [PremiaIntegrationViewComponent],
  providers: [
    CurrencyPipe
  ],
})
export class PremiaIntegrationViewModule { }
