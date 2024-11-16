import { FormlyFieldConfig } from "@ngx-formly/core";

export class ElectronicEquipmentNew{
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
            props: { label: 'Electronic Equipment' },
            fieldGroup: [
              {
                fieldGroupClassName: 'newclassname',
                fieldGroup: [
                  {
                    className: 'w-full md:mt-0 mt-3 mdw4',
                    type: 'commaSeparator',
                    key: 'ElectronicEquipmentSI',
                    templateOptions: {
                      label: `Sum Insured`,
                      required: true,
                      disabled: this.checkDisable('ElectronicEquipmentSI'),
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
            // fieldGroup: [
            //   {
            //     fieldGroupClassName: 'newclassname',
            //     fieldGroup: [
            //       {
            //         className: 'w-full md:mt-0 mt-3 md:w-1/3',
            //         type: 'displays',
            
            //         templateOptions: {
            //           label: `Sum Insured`,
            //           required: true,
  
            //         },
            //       },
            //       {
            //         className: 'w-full md:mt-0 mt-5 mdw-5',
            //         type: 'commaSeparator',
            //         key: 'AllriskSumInsured',
  
            //         props: {
            //           //label: `Sum Insured`,
            //           //(${this.commonDetails[0].Currency})`,
            //           maxLength: 15,
            //           disabled: this.checkDisable('AllriskSumInsured'),
            //           //required: true,
            //           options: [
  
            //           ],
  
            //         },
            //         validators: {
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
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
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}