import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { QuotationPlanRoutingModule } from './quotation-plan-routing.module';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { VehiclePlanComponent } from './vehicle-plan/vehicle-plan.component';
import { AccesoriesComponent } from './accesories/accesories.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { QuotationTypeInfoComponent } from './quotation-type-info/quotation-type-info.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { SharedModule } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PolicyInfoComponent } from './policy-info/policy-info.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ExcessDiscountComponent } from './excess-discount/excess-discount.component';
import { MaterialModule } from 'src/app/material/material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonalQuoteDetailsComponent } from './personal-quote-details/personal-quote-details.component';
import { FormlyModule } from '@ngx-formly/core';
import { DatepickerTypeComponent } from './formlyTypes/DatepickerTypeComponent';
import { TablesTypeComponent } from './formlyTypes/formlytable';
import { TableTypeComponent } from './formlyTypes/tableType';
import { CommaSeparatorInput } from './formlyTypes/commaSeperatorInput';
import { NgSelect } from './formlyTypes/ngselect';
import { RadioList } from './formlyTypes/radioList';
import { DisplayLabels } from './formlyTypes/displayformly';
import { DisplayLabel } from './formlyTypes/displayText';
import { RepeatTypeComponent } from './formlyTypes/repeatArray.type';
import { MultiSchemaTypeComponent } from './formlyTypes/multiSchemaType';
import { ArrayTypeComponent } from './formlyTypes/arrayType';
import { FormlyFieldStepper } from './formlyTypes/stepper.type';
import { FormlyFieldTabs } from './formlyTypes/tab.type';
import { NullTypeComponent } from './formlyTypes/nullType';
import { ObjectTypeComponent } from './formlyTypes/objectType';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { InputFieldType } from './formlyTypes/inputFieldType';
import { DateFieldType } from './formlyTypes/dateFieldType';
import { CommonProductDetailsComponent } from './common-product-details/common-product-details.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { TreeSelect, TreeSelectModule } from 'primeng/treeselect';
import { RiskDetailsComponent } from './Riskpage/Riskdetails.component';
import { NgSelectAlt } from './formlyTypes/ngselectAlt';
import { CopyQuoteComponent } from './copyQuote/copyquote.component';
import { ShortQuoteComponent } from './short-quote/short-quote.component';
import { TravelQuoteDetailsComponent } from './travel-quote-details/travel-quote-details.component';
import { CustomerInfoComponent } from '../../auth/login/customer-info/customer-info.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { HomePremiumComponent } from './home-premium/home-premium.component';
import { FieldsetModule } from 'primeng/fieldset';
import { TextareaTypeComponent } from './formlyTypes/textareaTypeField';
import { TimepickerTypeComponent } from './formlyTypes/timePicker';
//import { textareaTypeField } from './formlyTypes/textareaTypeField';
export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}
@NgModule({
  declarations: [
    VehicleCreateFormComponent,
    PolicyInfoComponent,
    CoverDetailsComponent,
    VehiclePlanComponent, 
    AccesoriesComponent,
    DocumentInfoComponent, 
    DriverInfoComponent, 
    QuotationTypeInfoComponent, 
    PaymentInfoComponent,
    ExcessDiscountComponent,
    PersonalQuoteDetailsComponent,
    CopyQuoteComponent,
    ObjectTypeComponent,
    ArrayTypeComponent,
    NullTypeComponent,
    InputFieldType,
    DateFieldType,
    FormlyFieldStepper,
    CommaSeparatorInput,
    DatepickerTypeComponent,
    TimepickerTypeComponent,
    FormlyFieldTabs,
    RepeatTypeComponent,
    TableTypeComponent,
    TablesTypeComponent,
    RadioList,
    NgSelect,
    NgSelectAlt,
    CommonProductDetailsComponent,
    RiskDetailsComponent,
    ShortQuoteComponent,
    TravelQuoteDetailsComponent,
    CustomerInfoComponent,
    HomePremiumComponent,TextareaTypeComponent
  ],
  imports: [
    CommonModule,
    QuotationPlanRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    CardModule,
    TreeSelectModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    CheckboxModule,
    SidebarModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    PipesModule,
    SelectButtonModule,
    RadioButtonModule,
    DirectivesModule,
    AccordionModule,
    SplitButtonModule,
    SpeedDialModule,
    CalendarModule,
    ConfirmDialogModule,
    InputNumberModule,
    MatDialogModule,
    MaterialModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    AutoCompleteModule,
    FieldsetModule,
    // InputGroupModule,
    // InputGroupAddonModule,
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
        { name: 'primeTextArea', component: TextareaTypeComponent, wrappers: ['form-field'] },
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
        // {
        //   name: 'number',
        //   extends: 'input',
        //   defaultOptions: {
        //     templateOptions: {
        //       type: 'number'
        //     }
        //   }
        // },
        {
          name: 'date',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'datepicker'
            }
          }
        },
        { name: 'input', component: InputFieldType }
        // { name: 'textarea', component: textareaTypeField },
        // {
        //   name: 'date',
        //    component: DateFieldType
        // }
      ],
		  }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormlyMaterialModule,
    FormlyBootstrapModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
		FormlyMatToggleModule,
    SelectButtonModule
  ]
})
export class QuotationPlanModule { }
