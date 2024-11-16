import { DatePipe } from "@angular/common";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomerCreateFormComponent } from "src/app/demo/components/customer/customer-create-form/customer-create-form.component";

export class CreateLead {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  currentDate: any;
  minDate: any;
  constructor() {
    let finalize = sessionStorage.getItem('FinalizeYN');
    if (finalize) this.finalizeYN = finalize;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (commonDetails) this.commonDetails = commonDetails;
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.enableFieldsList = endorseObj.FieldsAllowed;
      }
    }
    this.fields = {
      props: { label: 'Personal Information' },
      fieldGroup: [
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'CustomerTitle',
              key: 'Title',
              hide: false,
              hideExpression: false,
              templateOptions: {
                label: `Customer Title`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('Title'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'FirstName',
              key: 'ClientName',
              hide: false,
              hideExpression: false,
              templateOptions: {
                label: `Client Name`,
                placeholder: 'Enter Client Name',
                required: true,
                disabled: this.checkDisable('ClientName'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'CompanyName',
              key: 'CompanyName',
              hide: true,
              hideExpression: true,
              templateOptions: {
                label: `Company Name`,
                placeholder: 'Enter Company Name',
                required: true,
                disabled: this.checkDisable('ClientName'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'Gender',
              key: 'Gender',
              hide: false,
              hideExpression: false,
              templateOptions: {
                label: `Gender`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('Gender'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'BusinessType',
              key: 'BusinessType',
              hide: true,
              hideExpression: true,
              templateOptions: {
                label: `BusinessType`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('BusinessType'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'Occupation',
              key: 'Occupation',
              templateOptions: {
                label: `Occupation`,
                placeholder: '-Select Occupation-',
                required: true,
                disabled: this.checkDisable('Occupation'),
                maxLength: 50,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'EmailId',
              key: 'EmailId',
              templateOptions: {
                label: `Email Id`,
                placeholder: 'Enter EmailId',
                required: false,
                disabled: this.checkDisable('EmailId'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'CountryCode',
              key: 'MobileCode',
              templateOptions: {
                label: `Country Code`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('CountryCode'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'MobileNumber',
              key: 'MobileNo',
              templateOptions: {
                label: `Mobile Number`,
                placeholder: 'Enter MobileNo',
                required: false,
                disabled: this.checkDisable('MobileNo'),
                maxLength: 10
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
          ]
        },
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'IdentityType',
              key: 'PolicyHolderTypeid',
              templateOptions: {
                label: `Identity Type`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('PolicyHolderTypeid'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'IDNumber',
              key: 'IdNumber',
              templateOptions: {
                label: `ID Number`,
                placeholder: 'Enter ID Number',
                required: true,
                disabled: this.checkDisable('IdNumber'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'datepicker',
              id: 'RegistrationDate',
              key: 'RegistrationDate',
              hide: true,
              hideExpression: true,
              templateOptions: {
                type: 'date',
                label: `Registration Date`,
                placeholder: 'Registration Date',
                required: true,
                disabled: this.checkDisable('RegistrationDate'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'PreferedNotification',
              key: 'PreferredNotification',
              templateOptions: {
                label: `Preferred Notification`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('PreferredNotification'),
                maxLength: 15,
                options: [
                  { label: 'Select', value: '', 'CodeDesc': 'Select', 'CodeDescLocal': 'Selecione' },
                  { label: 'SMS', value: 'Sms', CodeDesc: 'SMS', 'CodeDescLocal': 'Sms' },
                  { label: 'Mail', value: 'Mail', CodeDesc: 'Mail', 'CodeDescLocal': 'E-mail' },
                  { label: 'Whatsapp', value: 'Whatsapp', CodeDesc: 'Whatsapp', 'CodeDescLocal': 'Whatsapp' }
                ]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              key: 'isTaxExempted',
              id: 'TaxExcempted',
              type: 'radioList',
              templateOptions: {
                type: 'radioList',
                required: true,
                disabled: this.checkDisable('isTaxExempted'),
                name: 'isTaxExempted',
              },
              props: {
                label: 'Tax Excempted',
                options: [{ value: 'Y', label: 'Yes', 'CodeDesc': 'Yes', 'CodeDescLocal': 'Sim' }, { value: 'N', label: 'No', 'CodeDesc': 'No', 'CodeDescLocal': 'Não' }],
              }
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'TaxExcemptedNo',
              key: 'TaxExemptedId',
              hide: true,
              hideExpression: true,
              templateOptions: {
                label: `Tax Excempted No`,
                placeholder: 'Enter Tax Excempted Number',
                required: true,
                disabled: this.checkDisable('TaxExcemptedNo'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'GstNumber',
              key: 'GstNumber',
              hide: true,
              hideExpression: true,
              templateOptions: {
                label: `VRN/ GST Number`,
                placeholder: 'VRN/ GST Number',
                required: true,
                disabled: this.checkDisable('GstNumber'),
                maxLength: 50
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
              key: 'Clientstatus',
              id: 'Status',
              type: 'radioList',
              hide: false,
              hideExpression: false,
              templateOptions: {
                type: 'radioList',
                required: true,
                disabled: this.checkDisable('Clientstatus'),
                name: 'Status',
              },
              props: {
                label: 'Status',
                options: [{ value: 'Y', label: 'Active', 'CodeDesc': 'Active', 'CodeDescLocal': 'Sim' }, { value: 'N', label: 'DeActive', 'CodeDesc': 'DeActive', 'CodeDescLocal': 'DésActivé' }, { value: 'P', label: 'Pending', 'CodeDesc': 'Pending', 'CodeDescLocal': 'En attente' }],
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'Street',
              key: 'Address1',
              templateOptions: {
                label: `Street`,
                placeholder: 'Enter Street',
                required: true,
                disabled: this.checkDisable('Address1'),
                maxLength: 150
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'Country',
              key: 'Country',
              templateOptions: {
                label: `Country`,
                placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('Country'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'Region',
              key: 'Region',
              templateOptions: {
                label: `Region`,
                required: true,
                disabled: this.checkDisable('Region'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
              type: 'ngselect',
              id: 'District',
              key: 'CityName',
              templateOptions: {
                label: `District`,
                required: true,
                disabled: this.checkDisable('District'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
              type: 'input',
              id: 'PoBox',
              key: 'PinCode',
              templateOptions: {
                label: `PoBox`,
                placeholder: 'Enter PoBox',
                required: true,
                disabled: this.checkDisable('PinCode'),
                maxLength: 150
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            }
          ]
        },
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'ngselect',
              id: 'ContactType',
              key: 'ContactType',
              templateOptions: {
                label: `Contact Type`,
                id: 'ContactType',
                name: 'ContactType',
                // placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('ContactType'),
                maxLength: 15,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'input',
              id: 'ContactPersonName',
              key: 'ContactPersonName',
              templateOptions: {
                label: `ContactPersonName`,
                // placeholder: 'Enter ID Number',
                required: true,
                disabled: this.checkDisable('ContactPersonName'),
                maxLength: 16
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'input',
              id: 'Email',
              key: 'EmailId',
              templateOptions: {
                label: `Email`,
                // placeholder: 'Enter ID Number',
                required: true,
                disabled: this.checkDisable('Email'),
                maxLength: 16
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'input',
              id: 'MobileNumber',
              key: 'MobileNumber',
              templateOptions: {
                label: `Mobile Number`,
                // placeholder: 'Enter ID Number',
                required: false,
                disabled: this.checkDisable('MobileNumber'),
                maxLength: 16
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'input',
              id: 'PhoneNumber',
              key: 'PhoneNumber',
              templateOptions: {
                label: `Phone Number`,
                // placeholder: 'Enter ID Number',
                required: false,
                disabled: this.checkDisable('PhoneNumber'),
                maxLength: 16
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'input',
              id: 'Designation',
              key: 'Designation',
              templateOptions: {
                label: `Designation`,
                // placeholder: 'Enter ID Number',
                required: false,
                disabled: this.checkDisable('Designation'),
                maxLength: 16
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
              type: 'textarea',
              id: 'Remarks',
              key: 'Remarks',
              templateOptions: {
                label: `Remarks`,
                // placeholder: 'Enter ID Number',
                required: false,
                disabled: this.checkDisable('Remarks'),
                maxLength: 100
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
          ]
        },
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'ngselect',
              id: 'RSABranch',
              key: 'RSABranch',
              templateOptions: {
                label: `RSA Branch`,
                // placeholder: 'Enter Street',
                required: true,
                disabled: this.checkDisable('RSABranch'),
                maxLength: 150,
                options: []
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },

            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'input',
              id: 'IntermediaryCode',
              key: 'IntermediaryCode',
              props: {
                label: `Intermediary Code`,
                id: 'IntermediaryCode',
                name:'IntermediaryCode',
                required: true,
                disabled: this.checkDisable('IntermediaryCode'),
                maxLength: 15,
                options:[]
              },
              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4  lg:col-4 xl:col-4',
              type: 'datepicker',
              id: 'LeadCreatedOn',
              key: 'LeadCreatedOn',
              templateOptions: {
                type:'date',
                label: `Lead Created On`,
                id: 'LeadCreatedOn',
                name:'LeadCreatedOn',
                // placeholder: '-Select-',
                required: true,
                disabled: this.checkDisable('LeadCreatedOn'),
                maxLength: 15,
                options:[]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'input',
              id: 'IntermediaryName',
              key: 'IntermediaryName',
              templateOptions: {
                label: `Intermediary Name`,
                // placeholder: 'Enter PoBox',
                required: false,
                disabled: this.checkDisable('IntermediaryName'),
                maxLength: 150
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },

            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'ngselect',
              id: 'Channel',
              key: 'Channel',
              templateOptions: {
                label: `Channel`,
                // placeholder: 'Enter PoBox',
                required: true,
                disabled: this.checkDisable('Channel'),
                maxLength: 150,
                options:[]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'ngselect',
              id: 'SectionType',
              key: 'SectionType',
              templateOptions: {
                label: `Section Type`,
                // placeholder: 'Enter PoBox',
                required: true,
                disabled: this.checkDisable('SectionType'),
                maxLength: 150,
                options:[]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'ngselect',
              id: 'ProbabilityOfSuccess',
              key: 'ProbabilityOfSuccess',
              templateOptions: {
                label: `Probability Of Success`,
                // placeholder: 'Enter PoBox',
                required: true,
                disabled: this.checkDisable('ProbabilityOfSuccess'),
                maxLength: 150,
                options:[]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'ngselect',
              id: 'TypeofBusiness',
              key: 'TypeofBusiness',
              templateOptions: {
                label: `Type of Business`,
                // placeholder: 'Enter PoBox',
                required: true,
                disabled: this.checkDisable('TypeofBusiness'),
                maxLength: 150,
                options:[]
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
            {
              className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
              type: 'textarea',
              id: 'CurrentInsurer',
              key: 'CurrentInsurer',
              templateOptions: {
                label: `Current Insurer`,
                // placeholder: 'Enter PoBox',
                required: false,
                disabled: this.checkDisable('CurrentInsurer'),
                maxLength: 150
              },

              validators: {
              },
              hooks: {
              },
              expressions: {
              },
            },
          ]
        }
      ]
    }
  }
  // constructor() {
  //   var d= new Date();
  //   var year = d.getFullYear();
  //   var month = d.getMonth();
  //   var day = d.getDate();
  //    this.currentDate = new Date();
  //   // this.minDobDate =

  //   this.minDate = new Date(year - 18,month, day );
  //     let finalize = sessionStorage.getItem('FinalizeYN');
  //     if(finalize) this.finalizeYN = finalize;
  //     this.subuserType = sessionStorage.getItem('typeValue');
  //     this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
  //     let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
  //     if (commonDetails) this.commonDetails = commonDetails;
  //     if (sessionStorage.getItem('endorsePolicyNo')) {
  //         this.endorsementSection = true;
  //         let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
  //         if (endorseObj) {
  //           this.enableFieldsList = endorseObj.FieldsAllowed;
  //         }
  //     }
  //     this.fields={
  //         props: { label: 'Customer Information' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'grid',
  //             fieldGroup: [
  //                 {
  //                     className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                     type: 'input',
  //                     id: 'ClientName',
  //                     key: 'ClientName',
  //                     hide: false,
  //                     hideExpression:false,
  //                     templateOptions: {
  //                       label: `Client Name`,
  //                       // placeholder: 'Enter Client Name',
  //                       required: true,
  //                       disabled: this.checkDisable('ClientName'),
  //                       maxLength: 50
  //                     },

  //                     validators: {
  //                     },
  //                     hooks: {
  //                     },
  //                     expressions: {
  //                     },
  //                   },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'ClientCode',
  //                 key: 'ClientCode',
  //                 hide: false,
  //                 hideExpression:false,
  //                 templateOptions: {
  //                   label: `Client Code`,
  //                   id: 'ClientCode',
  //                   name:'ClientCode',
  //                   // placeholder: '-Select-',
  //                   required: false,
  //                   disabled: this.checkDisable('Title'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },
  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'Address1',
  //                 key: 'Address1',
  //                 templateOptions: {
  //                   label: `Address 1`,
  //                   // placeholder: 'Enter Street',
  //                   required: false,
  //                   disabled: this.checkDisable('Address1'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'Address2',
  //                 key: 'Address2',
  //                 templateOptions: {
  //                   label: `Address 2`,
  //                   // placeholder: 'Enter Street',
  //                   required: false,
  //                   disabled: this.checkDisable('Address2'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'State',
  //                 key: 'State',
  //                 templateOptions: {
  //                   label: `State`,
  //                   required: true,
  //                   disabled: this.checkDisable('State'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'City',
  //                 key: 'CityName',
  //                 props: {
  //                   label: `City`,
  //                   id: 'City',
  //                   name:'City',
  //                   required: true,
  //                   disabled: this.checkDisable('CityName'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },
  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'PoBox',
  //                 key: 'PinCode',
  //                 templateOptions: {
  //                   label: `PoBox`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: true,
  //                   disabled: this.checkDisable('PinCode'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'MobileNumber',
  //                 key: 'MobileNo',
  //                 templateOptions: {
  //                   label: `Contact Number`,
  //                   // placeholder: 'Enter MobileNo',
  //                   required: true,
  //                   disabled: this.checkDisable('MobileNo'),
  //                   maxLength: 10
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'GST Number',
  //                 key: 'GSTNumber',
  //                 hide: false,
  //                 hideExpression:false,
  //                 templateOptions: {
  //                   label: `GSTNumber`,
  //                   // placeholder: 'Enter Company Name',
  //                   required: false,
  //                   disabled: this.checkDisable('GSTNumber'),
  //                   maxLength: 50
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //             ]
  //           },
  //           {
  //             fieldGroupClassName: 'grid',
  //             fieldGroup: [
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'ContactType',
  //                 key: 'ContactType',
  //                 templateOptions: {
  //                   label: `Contact Type`,
  //                   id: 'ContactType',
  //                   name:'ContactType',
  //                   // placeholder: '-Select-',
  //                   required: true,
  //                   disabled: this.checkDisable('ContactType'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'ContactPersonName',
  //                 key: 'ContactPersonName',
  //                 templateOptions: {
  //                   label: `ContactPersonName`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: true,
  //                   disabled: this.checkDisable('ContactPersonName'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'Email',
  //                 key: 'EmailId',
  //                 templateOptions: {
  //                   label: `Email`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: true,
  //                   disabled: this.checkDisable('Email'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'MobileNumber',
  //                 key: 'MobileNumber',
  //                 templateOptions: {
  //                   label: `Mobile Number`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: false,
  //                   disabled: this.checkDisable('MobileNumber'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'PhoneNumber',
  //                 key: 'PhoneNumber',
  //                 templateOptions: {
  //                   label: `Phone Number`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: false,
  //                   disabled: this.checkDisable('PhoneNumber'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'Designation',
  //                 key: 'Designation',
  //                 templateOptions: {
  //                   label: `Designation`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: false,
  //                   disabled: this.checkDisable('Designation'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'Remarks',
  //                 key: 'Remarks',
  //                 templateOptions: {
  //                   label: `Remarks`,
  //                   // placeholder: 'Enter ID Number',
  //                   required: false,
  //                   disabled: this.checkDisable('Remarks'),
  //                   maxLength: 16
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //             ]
  //           },
  //           {
  //             fieldGroupClassName: 'grid',
  //             fieldGroup: [
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'RSABranch',
  //                 key: 'RSABranch',
  //                 templateOptions: {
  //                   label: `RSA Branch`,
  //                   // placeholder: 'Enter Street',
  //                   required: true,
  //                   disabled: this.checkDisable('RSABranch'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },

  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'IntermediaryCode',
  //                 key: 'IntermediaryCode',
  //                 props: {
  //                   label: `Intermediary Code`,
  //                   id: 'IntermediaryCode',
  //                   name:'IntermediaryCode',
  //                   required: true,
  //                   disabled: this.checkDisable('IntermediaryCode'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },
  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4  lg:col-4 xl:col-4',
  //                 type: 'datepicker',
  //                 id: 'LeadCreatedOn',
  //                 key: 'LeadCreatedOn',
  //                 templateOptions: {
  //                   type:'date',
  //                   label: `Lead Created On`,
  //                   id: 'LeadCreatedOn',
  //                   name:'LeadCreatedOn',
  //                   // placeholder: '-Select-',
  //                   required: true,
  //                   disabled: this.checkDisable('LeadCreatedOn'),
  //                   maxLength: 15,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'input',
  //                 id: 'IntermediaryName',
  //                 key: 'IntermediaryName',
  //                 templateOptions: {
  //                   label: `Intermediary Name`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: false,
  //                   disabled: this.checkDisable('IntermediaryName'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },

  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'Channel',
  //                 key: 'Channel',
  //                 templateOptions: {
  //                   label: `Channel`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: true,
  //                   disabled: this.checkDisable('Channel'),
  //                   maxLength: 150,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'SectionType',
  //                 key: 'SectionType',
  //                 templateOptions: {
  //                   label: `Section Type`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: true,
  //                   disabled: this.checkDisable('SectionType'),
  //                   maxLength: 150,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'ProbabilityOfSuccess',
  //                 key: 'ProbabilityOfSuccess',
  //                 templateOptions: {
  //                   label: `Probability Of Success`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: true,
  //                   disabled: this.checkDisable('ProbabilityOfSuccess'),
  //                   maxLength: 150,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'ngselect',
  //                 id: 'TypeofBusiness',
  //                 key: 'TypeofBusiness',
  //                 templateOptions: {
  //                   label: `Type of Business`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: true,
  //                   disabled: this.checkDisable('TypeofBusiness'),
  //                   maxLength: 150,
  //                   options:[]
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
  //                 type: 'textarea',
  //                 id: 'CurrentInsurer',
  //                 key: 'CurrentInsurer',
  //                 templateOptions: {
  //                   label: `Current Insurer`,
  //                   // placeholder: 'Enter PoBox',
  //                   required: false,
  //                   disabled: this.checkDisable('CurrentInsurer'),
  //                   maxLength: 150
  //                 },

  //                 validators: {
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //             ]
  //           }
  //         ]
  //       }
  // }
  fields: FormlyFieldConfig;
  getFieldDetails() { return this.fields; }
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      console.log("Entry ", fieldName, entry)
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;

  }
}