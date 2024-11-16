import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class VehicleCreate{
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
                        key: 'MotorUsage',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Vehicle Usage`,
                          disabled: true,
                        //   required: true,
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
                      type: 'ngselect',
                      key: 'BodyType',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      props: {
                        label: `Body Type`,
                        disabled: true,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'ngselect',
                        key: 'Make',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        
                        props: {
                          label: `Make`,
                          disabled: true,
                        //   required: true,
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
                      type: 'ngselect',
                      key: 'Model',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      props: {
                        label: `Model`,
                        disabled: true,
                        // required: true,
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
                    // {
                    //     type: 'input',
                    //     key: 'ModelDesc',
                    //     defaultValue: '',
                    //     className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    //     props: {
                    //       label: `Model`,
                    //       disabled: true,
                    //     //   required: true,
                    //       options: [
          
                    //       ],
                    //     },
                    //     // validators: {
                    //     //   validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                    //     // },
                    //     hooks: {
                    //     },
                    //     expressions: {
                    //     },
                    // },
                    // {
                    //   type: 'input',
                    //   key: 'OtherModelDesc',
                    //   defaultValue: '',
                    //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    //   props: {
                    //     label: `Model Description`,
                    //     disabled: true,
                    //     // required: true,
                    //     options: [
        
                    //     ],
                    //   },
                    // //   validators: {
                    // //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                    // //   },
                    //   hooks: {
                    //   },
                    //   expressions: {
                    //   },
                    // },
                    {
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        type: 'input',
                        key: 'ChassisNo',
                        templateOptions: {
                          label: 'Chassis Number',
                          disabled: true,
                        //   required: true,
                        },
                        parsers: [
                          value => {
                              return (value = value.toUpperCase());
                          }
                      ],
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                    },
                    {
                        className: 'col-4',
                        type: 'input',
                        key: 'RegistrationNo',
                        templateOptions: {
                          label: 'Registration Number',
                          disabled: true,
                        //   required: false,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        type: 'input',
                        key: 'EngineNo',
                        templateOptions: {
                          label: 'Engine Number',
                          disabled: true,
                        //   required: true,
                        },
                        parsers: [
                          value => {
                              return (value = value.toUpperCase());
                          }
                       ],
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                    },
                    {
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        type: 'input',
                        key: 'EngineCapacity',
                        templateOptions: {
                          label: 'Engine Capacity',
                          disabled: true,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        type: 'input',
                        key: 'SeatingCapacity',
                        templateOptions: {
                          label: 'Seating Capacity',
                          disabled: true,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        type: 'input',
                        key: 'ManufactureYear',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Manufacture Year`,
                          disabled: true,
                        //   required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                        type: 'ngselect',
                        key: 'FuelType',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Fuel Used`,
                          disabled: true,
                        //   required: true,
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
                        type: 'ngselect',
                        key: 'Color',
                        defaultValue: '',
                        className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                        props: {
                          label: `Vehicle Color`,
                          disabled: true,
                        //   required: true,
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
                      type: 'ngselect',
                      key: 'MotorCategory',
                      defaultValue: '',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      props: {
                        label: `Motor Category`,
                        disabled: true,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                  },
                  {
                    type: 'input',
                    key: 'TareWeight',
                    defaultValue: '',
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    props: {
                      label: `Tare Weight`,
                      disabled: true,
                    //   required: true,
                      // options: [
      
                      // ],
                    },
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                    // },
                    hooks: {
                    },
                    expressions: {
                    },
                },
                {
                  type: 'input',
                  key: 'GrossWeight',
                  defaultValue: '',
                  className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                  props: {
                    label: `Gross Weight`,
                    disabled: true,
                  //   required: true,
                    options: [
    
                    ],
                  },
                  // validators: {
                  //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                  // },
                  hooks: {
                  },
                  expressions: {
                  },
              },
              {
                type: 'input',
                key: 'NoOfAxles',
                defaultValue: '',
                className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                props: {
                  label: `No Of Axles`,
                  disabled: true,
                //   required: true,
                  // options: [
  
                  // ],
                },
                // validators: {
                //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                // },
                hooks: {
                },
                expressions: {
                },
            },
            {
              type: 'input',
              key: 'AxleDistance',
              defaultValue: '',
              className: 'col-12 lg:col-4 md:col-4 xl:col-4',
              props: {
                label: `Axle Distance`,
                disabled: true,
              //   required: true,
                options: [

                ],
              },
              // validators: {
              //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
              // },
              hooks: {
              },
              expressions: {
              },
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