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
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { dealerRoutingModule } from './dealer-routing.module';
import { DialogModule } from 'primeng/dialog';
import { DamageDetailsComponent } from './damage-details/damage-details.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { maxlengthValidationMessage } from '../../common-quote-details/common-quote-details.module';
import { ArrayTypeComponent } from '../../quotation/quotation-plan/formlyTypes/arrayType';
import { CommaSeparatorInput } from '../../quotation/quotation-plan/formlyTypes/commaSeperatorInput';
import { DatepickerTypeComponent } from '../../quotation/quotation-plan/formlyTypes/DatepickerTypeComponent';
import { DisplayLabels } from '../../quotation/quotation-plan/formlyTypes/displayformly';
import { DisplayLabel } from '../../quotation/quotation-plan/formlyTypes/displayText';
import { TablesTypeComponent } from '../../quotation/quotation-plan/formlyTypes/formlytable';
import { InputFieldType } from '../../quotation/quotation-plan/formlyTypes/inputFieldType';
import { MultiSchemaTypeComponent } from '../../quotation/quotation-plan/formlyTypes/multiSchemaType';
import { NgSelect } from '../../quotation/quotation-plan/formlyTypes/ngselect';
import { NgSelectAlt } from '../../quotation/quotation-plan/formlyTypes/ngselectAlt';
import { NullTypeComponent } from '../../quotation/quotation-plan/formlyTypes/nullType';
import { ObjectTypeComponent } from '../../quotation/quotation-plan/formlyTypes/objectType';
import { RadioList } from '../../quotation/quotation-plan/formlyTypes/radioList';
import { RepeatTypeComponent } from '../../quotation/quotation-plan/formlyTypes/repeatArray.type';
import { FormlyFieldStepper } from '../../quotation/quotation-plan/formlyTypes/stepper.type';
import { FormlyFieldTabs } from '../../quotation/quotation-plan/formlyTypes/tab.type';
import { TableTypeComponent } from '../../quotation/quotation-plan/formlyTypes/tableType';
import { DealerComponent } from './dealer-home/dealer.component';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [DealerComponent, WorkOrderComponent, DamageDetailsComponent],
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
    dealerRoutingModule,
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
      { name: 'maxlength', message: maxlengthValidationMessage },],
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
export class dealerModule { }
