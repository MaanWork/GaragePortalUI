

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorVehicleSanlamBurkina{
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
          props: { label: 'All Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
             

              fieldGroup: [
                
                {
                  type: 'ngselect',
                  key: 'InsuranceType',
                  id:'InsuranceType',
                  defaultValue: '',
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                  props: {
                    label: `Insurance Type`,
                    disabled: this.checkDisable('InsuranceType'),
                    required: true,
                    options: [
    
                    ],
    
                  },
                  validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                      //  message: ( field: FormlyFieldConfig) =>"This Field is Required",
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  type: 'ngselect',
                  id:'InsuranceClass',
                  key: 'InsuranceClass',
                  defaultValue: '',
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
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
                // {
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //     id:'PurchaseDate',
                //     key: 'PurchaseDate',
                //     type: 'datepicker',
                //     defaultValue: '',
                //     templateOptions: {
                //       defaultValue: '',
                //     },
                //     props: {
                //       label: 'Purchase Date',
                //       required: true,
                //       type: 'date',
                //       datepickerOptions: {
                //         defaultValue: '',
                //       },
                //     }
                // },
                // {
                //   type: 'ngselect',
                //   id:'MotorUsage',
                //   key: 'MotorUsage',
                //   defaultValue: '',
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   props: {
                //     label: `Motor Usage`,
                //     disabled: this.checkDisable('MotorUsage'),
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
                {
                  type: 'ngselect',
                  id:'Deductibles',
                  key: 'Deductibles',
                  defaultValue: '',
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  hide: true,
                  hideExpression:true,
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
                
                // {
                //   type: 'ngselect',
                //   id:'DefenceCost',
                //   key: 'DefenceCost',
                //   defaultValue: '',
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   props: {
                //     label: `Defence Cost`,
                //     disabled: this.checkDisable('DefenceCost'),
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
                // {
                //   type: 'commaSeparator',
                //   id:'Newvalue',
                //   key: 'Newvalue',
                //   defaultValue: '',
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   hide: true,
                //   hideExpression:true,
                //   props: {
                //     label: `New  Value`,
                //     disabled: this.checkDisable('Newvalue'),
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
               
               
               
                // {
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   type: 'commaSeparator',
                //   key: 'InflationSumInsured',
                //   id:'InflationSumInsured',
                //   hide: false,
                //   hideExpression:false,
                //   props: {
                //     label: `Inflation SumInsured`,
                //     maxLength: 15,
                //     disabled: this.checkDisable('InflationSumInsured'),
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
                // {
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   type: 'input',
                //   id:'VehicleSI',
                //   key: 'VehicleSI',
                //   hide: true,
                //   hideExpression:true,
                //   props: {
                //     label: `SumInsured`,
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
                {
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  type: 'commaSeparator',
                  key: 'AccessoriesSI',
                  id:'AccessoriesSI',
                  hide: true,
                  hideExpression:true,
                  props: {
                    label: `Accessories SumInured`,
                    maxLength: 15,
                    disabled: this.checkDisable('AccessoriesSI'),
                    required: false,
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

                // {
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   type: 'input',
                //   key: 'Mileage',
                //   id:'Mileage',
                //   props: {
                //     label: `Mileage (Km/lit)`,
                //     maxLength: 15,
                //     disabled: this.checkDisable('Mileage'),
                //     required: false,
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
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  key: 'ClaimsYN',
                  id:'Claims',
                  type: 'radioList',
                  templateOptions: {
                    type: 'radioList',
                    label: 'Claims',
                    required: true,
                    disabled: this.checkDisable('ClaimsYN'),
                    name: 'Claims',
                    options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                  }
                },
                
                {
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  type: 'input',
                  key: 'NoOfClaimYears',
                  id:'NoOfClaimYears',
                  hide: true,
                  hideExpression:true,
                  props: {
                    label: `Number Of Claim Years`,
                    maxLength: 3,
                    disabled: this.checkDisable('NoOfClaimYears'),
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
                // {
                //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                //   type: 'datepicker',
                //   key: 'DateOfcirculation',
                //   id:'DateOfcirculation',
                //   props: {
                //     type:'datepicker',
                //     label: `Date Of circulation`,
                //     disabled: this.checkDisable('DateOfcirculation'),
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
                  className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  type: 'input',
                  key: 'Nombredecartes',
                  id:'Nombredecartes',
                  props: {
                    label: `Number of cards (WW Garage)`,
                    disabled: this.checkDisable('Nombredecartes'),
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
                  type: 'ngselect',
                  key: 'MunicipalityofTraffic',
                  id:'MunicipalityofTraffic',
                  props: {
                    label: `Municipality of Traffic`,
                    maxLength: 15,
                    disabled: this.checkDisable('MunicipalityofTraffic'),
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
                  key: 'Transportationofhydrocarbons',
                  id:'Transportationofhydrocarbons',
                  props: {
                    label: `Transportation of hydrocarbons`,
                    disabled: this.checkDisable('Transportationofhydrocarbons'),
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
                  type: 'ngselect',
                  key: 'Zone',
                  id:'Zone',
                  props: {
                    label: `Zone`,
                    maxLength: 15,
                    disabled: this.checkDisable('Transportationofhydrocarbons'),
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
                  type: 'ngselect',
                  key: 'Class',
                  id:'Class',
                  props: {
                    label: `Class`,
                    maxLength: 15,
                    disabled: this.checkDisable('Class'),
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
                  key: 'GpsYN',
                  id:'DoyouhaveGPS',
                  type: 'radioList',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    type: 'radioList',
                    label: 'Do you have GPS?',
                    required: true,
                    disabled: this.checkDisable('GpsYN'),
                    options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                  }
                },
                
                  // {
                  //   type: 'number',
                  //   key: 'HorsePower',
                  //   id: 'HorsePower',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                  //   props: {
                      
                  //     label: `Horse Power`,
                  //     disabled: this.checkDisable('HorsePower'),
                  //     required: true,
                  //     options: [
      
                  //     ],
      
                  //   },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
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