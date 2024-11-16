import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ProfessionalIndemnity{
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
              fieldGroupClassName: 'newclassname',
              fieldGroup: [
                {
                  className: 'w-full md:mt-0 mt-5 mdw-5',
                  type: 'input',
                  key: 'EmployeeCounts',
                  props: {
                    label: 'Principle Partners',
                    placeholder: "Principle Partners",
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
                  className: 'w-full md:mt-0 mt-3 md:w-1/3',
                  type: 'ngselect',
                  key: 'ProfessionalOccupation',
                  props: {
                    label: 'Occupation',
                    //hideExpression: "model.BuildingOwnerYn =='N'",
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },

                  expressions: {
  
                  },
                },
                {
                  className: 'w-full md:mt-0 mt-5 mdw-5',
                  type: 'input',
                  key: 'GISI',
                  props: {
                    label: 'Gross Income (Per Year)',
                    placeholder: "Gross Income",
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
                  className: 'w-full md:mt-0 mt-3 md:w-1/3',
                  type: 'ngselect',
                  key: 'IndemnityTypes',
                  props: {
                    label: 'Indemnity Type',
                    disabled: this.checkDisable('WallType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'w-full md:mt-0 mt-5 mdw-5',
                  type: 'commaSeparator',
                  key: 'ProfessionalSI',
                  templateOptions: {
                    label: `Indemnity SI`,
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