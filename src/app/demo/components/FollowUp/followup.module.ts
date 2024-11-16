import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule, NbActionsModule, NbCheckboxModule, NbRadioModule, NbIconModule } from '@nebular/theme';
//import { NgxPaginationModule } from 'ngx-pagination';


//import { ThemeModule } from '../../../@theme/theme.module';

//import { NbMomentDateModule } from '@nebular/moment';
//import {NbDialogService } from '@nebular/theme';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
//import { RejectedQuotesRoutingModule } from './rejected-quotes-routing.module';
//import { VieQuoteDetailsComponent } from './viewquote-details.component';
//import { ViewQuotesRoutingModule } from './viewquote-details-routing.module';
//import { MailComponent } from './mail.component';
//import { MailRoutingModule } from './mail-routing.module';
import { FollowupComponent } from './followup.component';
import { FollowupRoutingModule } from './followup-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../service/directives.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
//import { MatNativeDateModule } from '@angular/material';





@NgModule({
  declarations: [
    FollowupComponent,
    //MailComponent
    //VieQuoteDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MatDatepickerModule,
    FollowupRoutingModule,
    MatFormFieldModule,
    TableModule,
    MaterialModule,
    PipesModule,
    InputTextModule,
    SpeedDialModule,
    SelectButtonModule,
    ToastModule,
    MessagesModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ChipModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    DialogModule
  ],
  bootstrap: [
    //MailComponent
    FollowupComponent
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class FollowupModule { }
