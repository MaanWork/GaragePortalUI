import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { MailComponent } from './mail.component';
import { MailRoutingModule } from './mail-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../service/directives.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';





@NgModule({
  declarations: [
    MailComponent
    //VieQuoteDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MailRoutingModule,
    TableModule,
    MaterialModule,
    PipesModule,
    DropdownModule,
    ButtonModule,InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputTextModule,
    
  ],
  bootstrap: [
    MailComponent
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class MailModule { }
