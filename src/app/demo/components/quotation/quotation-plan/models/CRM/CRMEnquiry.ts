import { DatePipe } from "@angular/common";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomerCreateFormComponent } from "src/app/demo/components/customer/customer-create-form/customer-create-form.component";

export class CRMEnquiry{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  currentDate: any;
  minDate: any;
    
    constructor() {
      var d= new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
       this.currentDate = new Date();
      // this.minDobDate =
       
      this.minDate = new Date(year - 18,month, day );
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
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
        this.fields={
            props: { label: 'Enquiry Information' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'ngselect',
                    id: 'LOB',
                    key: 'LOB',
                    templateOptions: {
                      label: `LOB`,
                      required: true,
                      disabled: this.checkDisable('LOB'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'ngselect',
                    id: 'Product',
                    key: 'Product',
                    templateOptions: {
                      label: `Product`,
                      required: true,
                      disabled: this.checkDisable('Product'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'datepicker',
                    id: 'DateofReceiptofEnquiry',
                    key: 'DateofReceiptofEnquiry',
                    templateOptions: {
                      type:'date',
                      label: `Date Of Receipt Of Enquiry`,
                      id: 'DateofReceiptofEnquiry',
                      name:'DateofReceiptofEnquiry',
                      // placeholder: '-Select-',
                      required: true,
                      disabled: this.checkDisable('DateofReceiptofEnquiry'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'datepicker',
                    id: 'ExpectedDate',
                    key: 'ExpectedDate',
                    templateOptions: {
                      type:'date',
                      label: `Expected date of commencement of business`,
                      id: 'ExpectedDate',
                      name:'ExpectedDate',
                      // placeholder: '-Select-',
                      required: true,
                      disabled: this.checkDisable('ExpectedDate'),
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
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                        type: 'input',
                        id: 'SumInsured',
                        key: 'SumInsured',
                        hide: false,
                        hideExpression:false,
                        templateOptions: {
                          label: `SumInsured`,
                          // placeholder: 'Enter Client Name',
                          required: true,
                          disabled: this.checkDisable('SumInsured'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'SuggestedPremium',
                    key: 'SuggestedPremium',
                    hide: false,
                    hideExpression:false,
                    templateOptions: {
                      label: `Suggested Premium`,
                      id: 'SuggestedPremium',
                      name:'SuggestedPremium',
                      // placeholder: '-Select-',
                      required: true,
                      disabled: this.checkDisable('TiSuggestedPremiumtle'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'SuggestedRate',
                    key: 'SuggestedRate',
                    templateOptions: {
                      label: `Suggested Rate`,
                      // placeholder: 'Enter Street',
                      required: false,
                      disabled: this.checkDisable('SuggestedRate'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'IntermediaryName',
                    key: 'IntermediaryName',
                    templateOptions: {
                      label: `Intermediary Name`,
                      // placeholder: 'Enter Street',
                      required: true,
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'ngselect',
                    id: 'BusinessType',
                    key: 'BusinessType',
                    templateOptions: {
                      label: `Business Type`,
                      required: true,
                      disabled: this.checkDisable('BusinessType'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'textarea',
                    id: 'DescriptionofRisk',
                    key: 'DescriptionofRisk',
                    templateOptions: {
                      label: `Description of Risk`,
                      // placeholder: 'Enter PoBox',
                      required: true,
                      disabled: this.checkDisable('DescriptionofRisk'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'textarea',
                    id: 'Remarks',
                    key: 'Remarks',
                    templateOptions: {
                      label: `Remarks`,
                      // placeholder: 'Enter MobileNo',
                      required: true,
                      disabled: this.checkDisable('Remarks'),
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
            ]
          }
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}