

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorShortQuoteIvory{
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
                    id: 'MotorUsage', 
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
                    id: 'BodyType', 
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
                    id: 'Make', 
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
                    id: 'Model', 
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
                    id: 'ModelDesc', 
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
                    id: 'ManufactureYear', 
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
                    key: 'Deductibles',
                    id: 'Deductibles', 
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    props: {
                      label: `Deductibles`,
                      disabled: this.checkDisable('Deductibles'),
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
                    id:'VehicleValue',
                    key: 'VehicleValue',
                    defaultValue: '',
                    hide: false,
                    hideExpression:false,
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `VehicleValue`,
                      disabled: this.checkDisable('VehicleValue'),
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
                    id:'Marketvalue',
                    key: 'Marketvalue',
                    defaultValue: '',
                    hide: true,
                    hideExpression:true,
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Market Value`,
                      disabled: this.checkDisable('Marketvalue'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'Aggregatedvalue',
                    id:'Aggregatedvalue',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `Aggregated Value`,
                      maxLength: 15,
                      disabled: this.checkDisable('Aggregatedvalue'),
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
                    type: 'ngselect',
                    key: 'DefenceCost',
                    id: 'DefenceCost',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Defence Cost`,
                      disabled: this.checkDisable('DefenceCost'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'HorsePower',
                    key: 'HorsePower',
                    props: {
                      label: `Horse Power`,
                      maxLength: 15,
                      disabled: this.checkDisable('HorsePower'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'NoOfPassengers',
                    id:'NoOfPassengers',
                    props: {
                      label: `Number Of Passengers's `,
                      maxLength: 15,
                      disabled: this.checkDisable('NumberOfPassengers'),
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
                    key: 'ClaimsYN',
                    id: 'Claims',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      label: 'Claims',
                      required: true,
                      disabled: this.checkDisable('ClaimsYN'),
                      name: 'ClaimsYN',
                      options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                    }
                  },
                  // {
                  //   className: 'col-12 col-md-4 col-lg-4 col-xl-4',
                  //   type: 'input',
                  //   key: 'CubicCapacity',
                  //   hide: true,
                  //   hideExpression:true,
                  //   props: {
                  //     label: `Cubic Capacity`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('VehicleSI'),
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