import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ContentProfessionalIndermity{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';
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
          props: { label: 'Professional Indemnity'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-4 lg:col-4',
                  type: 'input',
                  key: 'ProfessionalStaff',
                  props: {
                    label: 'Professional Staff',
                    placeholder: "Professional Staff",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4',
                  type: 'input',
                  key: 'NonProfessionalStaff',
                  templateOptions: {
                    label: `Non Professional staff`,
                    required: true,
                    disabled: this.checkDisable('BuildingSuminsured'),
                    maxLength: 15
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    
                  },
                }
  
              ]
            }
          ]
            // props: { label: 'Professional Indemnity' },
           
            // fieldGroup: [
            //   {
            //     fieldGroupClassName: 'grid',
            //     fieldGroup: [
            //       {
            //         type: 'ngselect',
            //         key: 'ProfessionalOccupation',
            //         defaultValue: '',
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         props: {
            //           label: `Occupation`,
            //           disabled: this.checkDisable('OccupationType'),
            //           required: true,
            //           options: [
      
            //           ],
      
            //         },
            //         validators: {
            //           validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
            //       },
            //       {
            //         type: 'ngselect',
            //         key: 'ProfessionalType',
            //         defaultValue: '',
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         props: {
            //           label: `Professional Type`,
            //           disabled: this.checkDisable('OccupationType'),
            //           required: true,
            //           options: [
      
            //           ],
      
            //         },
            //         validators: {
            //           validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
            //       },
            //       {
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         type: 'input',
            //         key: 'EmployeeCounts',
            //         props: {
            //           label: 'Employee Count',
            //         //   placeholder: "YYYY",
            //           required: false,
            //           maxLength: 4,
            //           pattern: /[0-9]+/gm,
            //           disabled: this.checkDisable('BuildingBuildYear'),
            //           options: [
            //           ],
            //         },
            //       },
            //       {
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         type: 'input',
            //         key: 'ProfessionalSI',
            //         props: {
            //           label: 'Sum Insured',
            //           required: false,
            //           maxLength: 4,
            //           pattern: /[0-9]+/gm,
            //           disabled: this.checkDisable('BuildingBuildYear'),
            //           options: [
            //           ],
            //         },
            //       },
             
            //       {
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         type: 'input',
            //         key: 'GISI',
            //         props: {
            //           label: 'Gross Income',
            //         //   placeholder: "YYYY",
            //           required: false,
            //           maxLength: 4,
            //           pattern: /[0-9]+/gm,
            //           disabled: this.checkDisable('BuildingBuildYear'),
            //           options: [
            //           ],
            //         },
            //         hideExpression:true,
            //       },
            //       {
            //         type: 'ngselect',
            //         key: 'IndemnityTypes',
            //         defaultValue: '',
            //         className: 'col-12 lg:col-12 xl:col-12',
            //         props: {
            //           label: `Indemnity Type`,
            //           disabled: this.checkDisable('OccupationType'),
            //           required: true,
            //           options: [
      
            //           ],
      
            //         },
            //         validators: {
            //           validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
            //         hideExpression:true,
            //       },
                
            //     ]
            //   }
            // ]
          }
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}