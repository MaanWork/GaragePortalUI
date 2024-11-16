import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Moneys{
  customerDetails: any;
  commonDetails: any[]=[];
  endorsementSection: boolean=false;
  enableFieldsList: any[]=[];finalizeYN: any='N';
  subuserType: any=null;
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
      this.fields = {
        props: { label: 'Money' },
        fieldGroup: [
                  {
                    fieldGroupClassName: 'grid',
                      fieldGroup: [
                        {
                          className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                          type: 'displays',
                  
                          templateOptions: {
                            label: `Damage to Safe Limit`,
                            required: false,
        
                          },
                        },
                        {
                          className: 'col-12 md:col-6 lg:col-6',
                          type: 'commaSeparator',
                          key: 'MoneySafeLimit',
                          props: { 
                            label: `Sum Insured`,
                            maxLength: 15
                          },
                          templateOptions: {
                            disabled: this.checkDisable('SumInsured')
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                          },
          
                          expressions: {
                          
                          },
                        }
                      ],
                    },
                    {
                    fieldGroupClassName: 'grid',
                      fieldGroup: [
                        {
                          className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                          type: 'displays',
                  
                          templateOptions: {
                            label: `Money Out of Safe`,
                            required: false,
        
                          },
                        },
                        {
                          className: 'col-12 md:col-6 lg:col-6',
                          type: 'commaSeparator',
                          key: 'MoneyOutofSafe',
                          props: { 
                            label: `Sum Insured`,
                            maxLength: 15
                          },
                          templateOptions: {
                            disabled: this.checkDisable('SumInsured')
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                          },
          
                          expressions: {
                          
                          },
                        }
                      ],
                    },
                    {
                    fieldGroupClassName: 'grid',
                      fieldGroup: [
                        {
                          className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                          type: 'displays',
                  
                          templateOptions: {
                            label: `Director/Manager- Residence`,
                            required: false,
        
                          },
                        },
                        {
                          className: 'col-12 md:col-6 lg:col-6',
                          type: 'commaSeparator',
                          key: 'MoneyDirectorResidence',
                          props: { 
                            label: `Sum Insured`,
                            maxLength: 15
                          },
                          templateOptions: {
                            disabled: this.checkDisable('SumInsured')
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                          },
          
                          expressions: {
                          
                          },
                        }
                      ],
                    },
                    {
                      fieldGroupClassName: 'grid',
                        fieldGroup: [
                          {
                            className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                            type: 'displays',
                    
                            templateOptions: {
                              label: `Major Loss Limit`,
                              required: false,
          
                            },
                          },
                          {
                            className: 'col-12 md:col-6 lg:col-6',
                            type: 'commaSeparator',
                            key: 'MoneyMajorLoss',
                            props: { 
                              label: `Sum Insured`,
                              maxLength: 15
                            },
                            templateOptions: {
                              disabled: this.checkDisable('SumInsured')
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                            },
            
                            expressions: {
                            
                            },
                          }
                        ],
                    },
                    {
                      fieldGroupClassName: 'grid',
                        fieldGroup: [
                          {
                            className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                            type: 'displays',
                    
                            templateOptions: {
                              label: `Collectors / salesman`,
                              required: false
                            },
                          },
                          {
                            className: 'col-12 md:col-6 lg:col-6',
                            type: 'commaSeparator',
                            key: 'MoneyCollector',
                            props: { 
                              label: `Sum Insured`,
                              maxLength: 15
                            },
                            templateOptions: {
                              disabled: this.checkDisable('SumInsured')
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                            },
            
                            expressions: {
                            
                            },
                          },
                          
                        ],
                    },
                    {
                      fieldGroupClassName: 'grid',
                        fieldGroup: [
                          {
                            className: 'col-12 md:col-5 lg:col-5 col-offset-1 endText',
                            type: 'displays',
                    
                            templateOptions: {
                              label: `Annual Carry`,
                              required: false
                            },
                          },
                          {
                            className: 'col-12 md:col-6 lg:col-6',
                            type: 'commaSeparator',
                            key: 'MoneyAnnualEstimate',
                            props: { 
                              label: `Sum Insured`,
                              maxLength: 15
                            },
                            templateOptions: {
                              disabled: this.checkDisable('SumInsured')
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                            },
            
                            expressions: {
                            
                            },
                          },
                          
                        ],
                    },
                    
                ],
      }
  }
  fields:FormlyFieldConfig;
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