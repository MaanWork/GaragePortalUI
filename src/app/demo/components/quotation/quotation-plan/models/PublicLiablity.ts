import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PublicLiability{
  customerDetails: any;
  commonDetails: any[]=[];
  endorsementSection: boolean=false;
  enableFieldsList: any[]=[];
  constructor() {
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
        props: { label: 'Public Liability' },
        
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'input',
                    key: 'LocationName',
                    defaultValue: '',
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    templateOptions: {
                      label: `Location`,
                      required: true,
                      placeholder: 'Enter LocationName',
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
                  type: 'ngselect',
                  key: 'RegionCode',
                  defaultValue: '',
                  className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                  templateOptions: {
                    label: `Region`,
                    placeholder: 'Select Region',
                   // disabled: true,
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
                  key: 'DistrictCode',
                  defaultValue: '',
                  className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                  templateOptions: {
                    label: `District`,
                    placeholder: 'Select District',
                   // disabled: true,
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
                // {
                //   type: 'ngselect',
                //   key: 'FirstLossPayee',
                //   defaultValue: '',
                //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //   templateOptions: {
                //     label: `First Loss Payee`,
                //     placeholder: 'Select First Loss Payee',
                //    // disabled: true,
                //     required: true,
                //     options: [
    
                //     ],
    
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
                //   expressions: {
                //   },
                // },
              ]
              },
              {
                type: 'table',
                fieldGroup: [
                  {
                      fieldGroup:[
                        {props:{label:`Sum Insured`}},
                      ]
                  },
                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup:[
                      {
                        fieldGroup:[
                          {
                            className: "W-full col-12 lg:col-4 md:col-4 xl:col-4",
                            type: 'displays',
                            templateOptions: {
                              label: `Any one Accident / Event / Occurence`,
                              required: false,
                            },
                          },
                          {
                            className:"labelsum",
                            type: 'commaSeparator',
                            key: 'AnyAccidentSi',
                            props: { 
                              label: `Sum Insured`,
                              maxLength: 15
                            },
                            templateOptions: {
                              disabled: this.checkDisable('BuildingSuminsured')
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
                      },
                      {
                        fieldGroup:[
                         
                          {
                            className: "splitCardHeaderss",
                            type: 'displays',
          
                            templateOptions: {
                              label: `Any one Period of Insurance`,
                              required: false,
          
                            },
                          },
                          {
                            className:"labelsum",
                            type: 'commaSeparator',
                            key: 'InsurancePeriodSi',
                            props: { 
                              label: `Sum Insured`,
                              maxLength: 15
                            },
                            templateOptions: {
                              disabled: this.checkDisable('BuildingSuminsured')
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
                      },
                    ]
                  },
                ]
              }
            ]
          }
        ]
      }
  }
  fields:FormlyFieldConfig;
  checkDisable(fieldName) {
      if (this.endorsementSection) {
        let entry = this.enableFieldsList.some(ele => ele == fieldName);
        return !entry;
      }
      else return false;
    
    }
}