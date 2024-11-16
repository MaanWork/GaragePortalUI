import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class EmployersLiabilitytwo{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    enableAllSection: boolean = false;
    buildingSection: boolean = false;
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
        this.fields = [
            {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid mt-2',
                    fieldGroup: [
                     
                      {
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'ngselect',
                        
                        key: 'LiabilityOccupationId',
                        defaultValue: '',
                        props: {
                          label: `Occupation`,
                          disabled: this.checkDisable('OccupationType'),
                          required : true,
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
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'input',
                        key: 'otheroption',
                        defaultValue: '',
                        hide:true,
                        hideExpression: true,
                        props: {
                          label: `Others Description`,
                          required: false,
                          disabled: this.checkDisable('LiabilityOccupationId'),
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                          
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'input',
                        key: 'TotalNoOfEmployees',
                        templateOptions: {
                          label: `Employee Count`,
                          disabled: this.checkDisable('SumInsured'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'EmpLiabilitySi',
                        defaultValue: '0',
                        props: {
                          label: `Sum Insured`,
                          required: true,
                          disabled: this.checkDisable('SumInsured'),
                          maxLength: 15,
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
                      }
                    ]
                }
              ]
            }
          ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
    
}