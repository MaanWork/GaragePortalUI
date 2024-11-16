import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";

export class BussinessAllRisk{
  customerDetails: any;
  commonDetails: any[]=[];
  endorsementSection: boolean=false;
  enableFieldsList: any[]=[];
  finalizeYN: any='N';
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
          props: { label: 'Business All Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid mt-2',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-6 lg:col-6 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: `Industry Type`,
                      required: false,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'ngselect',
                      key: 'IndustryBussinessAllRisk',
                      
                      props: { 
                        maxLength: 15,
                        label: ``,
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
              fieldGroupClassName: 'grid mt-2',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-6 lg:col-6 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: `Sum Insured`,
                      required: false,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'commaSeparator',
                      key: 'EquipmentSi',
                      
                      props: { 
                        maxLength: 15,
                        label: ``,
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
          ]
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