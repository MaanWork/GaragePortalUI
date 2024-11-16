import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputFieldType } from '../quotation/quotation-plan/formlyTypes/inputFieldType';
import { DatepickerTypeComponent } from '../quotation/quotation-plan/formlyTypes/DatepickerTypeComponent';
import { FormlyModule } from '@ngx-formly/core';
import { MatNativeDateModule } from '@angular/material/core';
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
import { CommaSeparatorInput } from '../quotation/quotation-plan/formlyTypes/commaSeperatorInput';
import { TableTypeComponent } from '../quotation/quotation-plan/formlyTypes/tableType';
import { TablesTypeComponent } from '../quotation/quotation-plan/formlyTypes/formlytable';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgSelectAlt } from '../quotation/quotation-plan/formlyTypes/ngselectAlt';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonQuoteDetailsComponent } from './common-quote-details.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../customer/customer.module';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

@NgModule({
  declarations: [CommonQuoteDetailsComponent],
  imports: [
    CommonModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    SidebarModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    MaterialModule,
    MessagesModule,
    BrowserModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    RadioButtonModule,
    AutoCompleteModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
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
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  FormlyModule.forRoot({
    validators: [
     
    ],
    validationMessages: [
      { name: 'required', message: ''},
    ],
  }),
  ]
})
export class CommonQuoteDetailsModule { }
