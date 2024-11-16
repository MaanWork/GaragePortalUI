import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class Bond{
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
                  fieldGroupClassName: 'grid',
                  fieldGroup: [
                    {
                      type: 'ngselect',
                      key: 'IndustryId',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      templateOptions: {
                        label: `Industry`,
                        disabled: this.checkDisable('TypeOfBond'),
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
                            type: 'ngselect',
                            key: 'TypeOfBond',
                            defaultValue: '',
                            className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                            templateOptions: {
                              label: `Bond Type`,
                              disabled: this.checkDisable('TypeOfBond'),
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
                            type: 'ngselect',
                            key: 'NoOfYears',
                            defaultValue: '',
                            className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                            templateOptions: {
                              label: `Number Of Years`,
                              disabled: this.checkDisable('NoOfYears'),
                              required: true,
                              options: [
              
                              ],
              
                            },
                            validators: {
                             
                            },
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                          {
                            type: 'commaSeparator',
                            className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                            key: 'BondSI',
                            defaultValue: '0',
                            props: {
                              label: `SumInsured`,
                              disabled: this.checkDisable('SumInsured'),
                              maxLength: 15,
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