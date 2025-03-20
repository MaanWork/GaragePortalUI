import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipModule } from 'primeng/chip';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from 'primeng/api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CardModule } from 'primeng/card';
import { FormlyModule } from '@ngx-formly/core';
import { maxlengthValidationMessage } from '../common-quote-details/common-quote-details.module';
import { FormlyFieldStepper } from '../quotation/quotation-plan/formlyTypes/stepper.type';
import { FormlyFieldTabs } from '../quotation/quotation-plan/formlyTypes/tab.type';
import { NullTypeComponent } from '../quotation/quotation-plan/formlyTypes/nullType';
import { ArrayTypeComponent } from '../quotation/quotation-plan/formlyTypes/arrayType';
import { ObjectTypeComponent } from '../quotation/quotation-plan/formlyTypes/objectType';
import { MultiSchemaTypeComponent } from '../quotation/quotation-plan/formlyTypes/multiSchemaType';
import { RepeatTypeComponent } from '../quotation/quotation-plan/formlyTypes/repeatArray.type';
import { DisplayLabel } from '../quotation/quotation-plan/formlyTypes/displayText';
import { DisplayLabels } from '../quotation/quotation-plan/formlyTypes/displayformly';
import { RadioList } from '../quotation/quotation-plan/formlyTypes/radioList';
import { NgSelect } from '../quotation/quotation-plan/formlyTypes/ngselect';
import { NgSelectAlt } from '../quotation/quotation-plan/formlyTypes/ngselectAlt';
import { CommaSeparatorInput } from '../quotation/quotation-plan/formlyTypes/commaSeperatorInput';
import { TableTypeComponent } from '../quotation/quotation-plan/formlyTypes/tableType';
import { TablesTypeComponent } from '../quotation/quotation-plan/formlyTypes/formlytable';
import { DatepickerTypeComponent } from '../quotation/quotation-plan/formlyTypes/DatepickerTypeComponent';
import { InputFieldType } from '../quotation/quotation-plan/formlyTypes/inputFieldType';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { DialogModule } from 'primeng/dialog';
import { FnolHomeComponent } from './fnol-home/fnol-home.component';
import { FnolRoutingModule } from './fnol-routing.module';
import { CreateFNOLComponent } from './create-fnol/create-fnol.component';
import { FnolListingComponent } from './fnol-listing/fnol-listing.component';
import { TimepickerTypeComponent } from '../quotation/quotation-plan/formlyTypes/timePicker';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [FnolHomeComponent,CreateFNOLComponent, FnolListingComponent],
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
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ChipModule,
    CardModule,
   FnolRoutingModule,
    DialogModule ,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' },
      // { name: 'maxlength', message: maxlengthValidationMessage },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        { name: 'tabs', component: FormlyFieldTabs, wrappers: [] },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'display', component: DisplayLabel },
        { name: 'displays', component: DisplayLabels },
        { name: 'radioList', component: RadioList },
        {name: 'ngselect', component:NgSelect},
        {name: 'ngselectAlt', component:NgSelectAlt},
        { name: 'commaSeparator', component: CommaSeparatorInput, wrappers: ['form-field'] },
        //{ name: 'commaSeparators', component: CommaSeparatorsInput, wrappers: ['form-field'] },
        { name: 'table', component: TableTypeComponent, wrappers: ['form-field'] },
        { name: 'tables', component: TablesTypeComponent, wrappers: ['form-field'] },
        {
          name: 'datepicker',
          component: DatepickerTypeComponent,
          //wrappers: ['form-field'],
          defaultOptions: {
            defaultValue: new Date(),
            templateOptions: {
              datepickerOptions: {},
            },
          },
        },
        {
          name: 'timepicker',
          component: TimepickerTypeComponent,
          defaultOptions: {
            defaultValue: new Date(),
            templateOptions: {
              datepickerOptions: {},
            },
          },
        },
        // {
        //   name: 'my-autocomplete',
        //   component: NgSelectFormlyComponent
        // },
        {
          name: 'string',
          extends: 'input'
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number'
            }
          }
        },
        {
          name: 'date',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'datepicker'
            }
          }
        },
        {
          name: 'time',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'timepicker'
            }
          }
        },
        { name: 'input', component: InputFieldType },
        // { name: 'textarea', component: textareaTypeField },
        // {
        //   name: 'date',
        //    component: DateFieldType
        // }
        ],
		  }),
      FormlyMaterialModule,
      FormlyBootstrapModule,
      MatNativeDateModule,
      FormlyMatDatepickerModule,
      FormlyMatToggleModule,
  ]
})
export class FnolModule { }
