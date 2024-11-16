import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GroupPersonalAccident{
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
        this.fields = [
          {
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        type: 'ngselect',
                        key: 'OccupationType',
                        defaultValue: '',
                        className: 'col-9',
                        props: {
                          label: `Occupation`,
                          disabled: this.checkDisable('OccupationType'),
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
                        className: 'col-3',
                        type: 'number',
                        key: 'TotalNoOfGroupMemeber',
                        templateOptions: {
                          label: 'Members Count',
                          disabled: this.checkDisable('TotalNoOfGroupMemeber'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                        },
                      },
                      
                      {
                        type: 'commaSeparator',
                        className: 'col-6',
                        key: 'SumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Death SumInsured`,
                          maxLength: 15,
                          disabled: this.checkDisable('SumInsured'),
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
                        type: 'commaSeparator',
                        className: 'col-6',
                        key: 'TTDSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Total Temporary Disability SumInsured`,
                          maxLength: 15,
                          disabled: this.checkDisable('TTDSumInsured'),
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
                        type: 'commaSeparator',
                        className: 'col-6',
                        key: 'MESumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Medical Expenses SumInsured`,
                          maxLength: 15,
                          disabled: this.checkDisable('MESumInsured'),
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
                        type: 'commaSeparator',
                        className: 'col-6',
                        key: 'FESumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Funeral Expenses SumInsured`,
                          maxLength: 15,
                          disabled: this.checkDisable('FESumInsured'),
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
                    ]
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