

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorShotQuoteEagle{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields={
            props: { label: 'Policy Details' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'MotorUsage',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Motor Usage`,
                      disabled: this.checkDisable('MotorUsage'),
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
                    key: 'BodyType',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Body Type`,
                      disabled: this.checkDisable('BodyType'),
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
                    key: 'Make',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Make`,
                      disabled: this.checkDisable('Make'),
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
                    key: 'Model',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Model`,
                      disabled: this.checkDisable('Model'),
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
                    type: 'input',
                    key: 'ModelDesc',
                    defaultValue: '',
                    hide: true,
                    hideExpression:true,
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Model Description`,
                      disabled: this.checkDisable('ModelDesc'),
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
                    key: 'ManufactureYear',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Manufacture Year`,
                      disabled: this.checkDisable('ManufactureYear'),
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
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                  //   type: 'input',
                  //   key: 'ChassisNo',
                  //   props: {
                  //     label: `Chassis No`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('ChassisNo'),
                  //     required: true,
                  //     options: [
  
                  //     ],
  
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    type: 'ngselect',
                    key: 'InsuranceClass',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Insurance Class`,
                      disabled: this.checkDisable('InsuranceClass'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'commaSeparator',
                    key: 'VehicleSI',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `VehicleSI`,
                      maxLength: 15,
                      disabled: this.checkDisable('VehicleSI'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    key: 'RenewalYn',
                    id: 'RenewalYn',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      
                      required: true,
                      disabled: this.checkDisable('RenewalYn'),
                      name: 'RenewalYn',
                     
                    },
                    props:{
                      label: 'Renewal',
                      options: [{ value: 'Y', label: 'Yes',CodeDesc:'Yes','CodeDescLocal':'Sim' }, { value: 'N', label: 'No',CodeDesc:'No','CodeDescLocal':'Não' }],
                    }
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
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
    }
}