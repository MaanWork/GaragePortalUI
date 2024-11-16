import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";

export class ElectronicEquipments{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
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
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  
                {
                  type: 'ngselect',
                  key: 'ContentId',
                  defaultValue: '',
                  className: 'col-12 ',
                  templateOptions: {
                    label: `Electronic Item`,
                    placeholder: 'Select Content Type',
                   // disabled: true,
                    required: true,
                    options: [
    
                    ],
    
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  type: 'input',
                  key: 'Serial',
                  defaultValue: '',
                  className: 'col-12 ',
                  templateOptions: {
                    label: `Serial No`,
                    required: true,
                    placeholder: 'Enter Serial No',
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
              },
              // {
              //   type: 'ngselect',
              //   key: 'FirstLossPayee',
              //   defaultValue: '',
              //   className: 'col-12 ',
              //   templateOptions: {
              //     label: `First Loss Payee`,
              //     placeholder: 'Select First Loss Payee',
              //    // disabled: true,
              //     required: true,
              //     options: [
  
              //     ],
  
              //   },
              //   validators: {
              //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              //   },
              //   hooks: {
              //   },
              //   expressions: {
              //   },
              // },
              {
                type: 'textarea',
                key: 'Description',
                defaultValue: '',
                className: 'col-12',
                templateOptions: {
                  label: `Description`,
                  required: true,
                  placeholder: 'Enter Description',
                },
                validators: {
                  validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                },
                hooks: {
                },
                expressions: {
                },
            },
                  {
                    className: 'col-12  mt-2',
                    type: 'commaSeparator',
                    key: 'ElecEquipSuminsured',
                    templateOptions: {
                      label: `Sum Insured`,
                      required: true,
                      disabled: this.checkDisable('Salary'),
                      maxLength: 15
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