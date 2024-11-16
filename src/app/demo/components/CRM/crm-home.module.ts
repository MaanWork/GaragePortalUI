import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ReferralCasesComponent } from '../Admin/referralCases/referral-cases.component';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { CRMHomeRoutingModule } from './crm-customer/crm-customer/crm-home-routing.module';
import { CrmHomeComponent } from './crm-home/crm-home.component';
import { FormlyModule } from '@ngx-formly/core';
import { MatNativeDateModule } from '@angular/material/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { maxlengthValidationMessage } from '../common-quote-details/common-quote-details.module';
import { ArrayTypeComponent } from '../quotation/quotation-plan/formlyTypes/arrayType';
import { CommaSeparatorInput } from '../quotation/quotation-plan/formlyTypes/commaSeperatorInput';
import { DatepickerTypeComponent } from '../quotation/quotation-plan/formlyTypes/DatepickerTypeComponent';
import { DisplayLabels } from '../quotation/quotation-plan/formlyTypes/displayformly';
import { DisplayLabel } from '../quotation/quotation-plan/formlyTypes/displayText';
import { TablesTypeComponent } from '../quotation/quotation-plan/formlyTypes/formlytable';
import { InputFieldType } from '../quotation/quotation-plan/formlyTypes/inputFieldType';
import { MultiSchemaTypeComponent } from '../quotation/quotation-plan/formlyTypes/multiSchemaType';
import { NgSelect } from '../quotation/quotation-plan/formlyTypes/ngselect';
import { NgSelectAlt } from '../quotation/quotation-plan/formlyTypes/ngselectAlt';
import { NullTypeComponent } from '../quotation/quotation-plan/formlyTypes/nullType';
import { ObjectTypeComponent } from '../quotation/quotation-plan/formlyTypes/objectType';
import { RadioList } from '../quotation/quotation-plan/formlyTypes/radioList';
import { RepeatTypeComponent } from '../quotation/quotation-plan/formlyTypes/repeatArray.type';
import { FormlyFieldStepper } from '../quotation/quotation-plan/formlyTypes/stepper.type';
import { FormlyFieldTabs } from '../quotation/quotation-plan/formlyTypes/tab.type';
import { TableTypeComponent } from '../quotation/quotation-plan/formlyTypes/tableType';
import { PrimeIcons } from 'primeng/api';
import { CrmCustomerComponent } from './crm-customer/crm-customer/crm-customer.component';

@NgModule({
    imports: [
        CommonModule,
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
        CRMHomeRoutingModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        DialogModule,
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
            //   { name: 'textarea', component: t },
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
        })
    ],
    declarations: [CrmHomeComponent, CrmCustomerComponent]
})
export class CRMHomeModule { }
