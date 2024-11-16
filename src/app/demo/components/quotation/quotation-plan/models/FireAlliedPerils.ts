import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class FireAlliedPerils{
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
                        className: 'col-12 md:col-7 lg:col-7 xl:col-7 pl-2 pr-2 pt-1',
                        key: 'InsuranceType',
                        id: 'InsuranceType',
                        type: 'radioList',
                        templateOptions: {
                          type: 'radioList',
                          required: true,
                          disabled: this.checkDisable('InsuranceType'),
                          name: 'InsuranceType',
                        },
                        props: {
                          label: 'Insurance Type',
                          options: [],
                        }
                      },
                      {
                        type: 'ngselect',
                        key: 'OccupationId',
                        id: 'OccupationId',
                        defaultValue: '',
                        className: 'col-12 md:col-5 lg:col-5 xl:col-5 pl-2 pr-2 pt-1',
                        props: {
                          label: `Occupation`,
                          disabled: this.checkDisable('OccupationId'),
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
                        key: 'Section',
                        id: 'Section',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                        props: {
                          label: `Industry Cover`,
                          disabled: this.checkDisable('Section'),
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'commaSeparator',
                        key: 'FireSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Sum Insured`,
                          required: true,
                          disabled: this.checkDisable('FireSumInsured'),
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
                      },
                      {
                        type: 'ngselect',
                        key: 'BusinessName',
                        id: 'BusinessName',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                        props: {
                          label: `Business Interruption`,
                          disabled: this.checkDisable('BusinessName'),
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'commaSeparator',
                        key: 'BusinessSI',
                        defaultValue: '0',
                        props: {
                          label: `Business SI`,
                          required: true,
                          disabled: true,
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
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'textarea',
                          key: 'CoveringDetails',
                          
                          props: { 
                            label: `Covering Details`,
                            maxLength: 1000,
                            
                          },
                          templateOptions: {
                            //disabled: this.checkDisable('BuildingSuminsured')
                            required: true,
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'textarea',
                          key: 'DescriptionOfRisk',
                          
                          props: { 
                            maxLength: 1000,
                            label: `Description Of Risk`,
                          },
                          templateOptions: {
                            //disabled: this.checkDisable('BuildingSuminsured')
                            required: true,
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'ngselect',
                          key: 'RegionCode',
                          
                          props: { 
                            maxLength: 15,
                            label: `Region`,
                          },
                          templateOptions: {
                            //disabled: this.checkDisable('BuildingSuminsured')
                            required: true,
                            options: []
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'ngselect',
                          key: 'DistrictCode',
                          
                          props: { 
                            maxLength: 15,
                            label: `District`,
                          },
                          templateOptions: {
                            //disabled: this.checkDisable('BuildingSuminsured')
                            required: true,
                            options: []
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