import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { NewComponent } from '../newpage/newpage.component';
import { NewRouteRoutingModule } from './newpage-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../service/directives.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
//import { RejectedQuotesRoutingModule } from './rejected-quotes-routing.module';
@NgModule({
  declarations: [
   
    NewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NewRouteRoutingModule,
    TableModule,
    MaterialModule,
    PipesModule,
    ButtonModule,
    MenuModule,
  ],
  bootstrap: [NewComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class NewPageModule { }
