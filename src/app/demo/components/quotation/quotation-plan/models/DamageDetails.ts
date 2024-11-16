import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class DamageDetails {
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    public model = {}
    subuserType: any=null;
    finalizeYN: any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields= {
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                    {
                        type: 'ngselect',
                        key: 'DamageDirection',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Damage Direction`,
                          disabled: false,
                          required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'input',
                      key: 'DamagePart',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      props: {
                        label: `Damage Part`,
                        disabled: false,
                        required: true,
                        options: [
        
                        ],
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'ngselect',
                        key: 'RepairReplace',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        
                        props: {
                          label: `Repair / Replace`,
                          disabled: false,
                          required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'input',
                      key: 'NoOfUnits',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      props: {
                        label: `No. Of Units`,
                        disabled: false,
                        required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'input',
                        key: 'UnitPrice',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Unit Price`,
                          disabled: false,
                          required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        type: 'input',
                        key: 'ReplacementCharge',
                        templateOptions: {
                          label: 'Replacement Charge',
                          disabled: false,
                        //   required: false,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        // },
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
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}