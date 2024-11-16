import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class TotalAmount {
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
                    type: 'commaSeparator',
                    key: 'sparePartsCost',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                     // label: `Spare Part Depreciation`,
                      disabled: true,
                    //   required: true,
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
                    type: 'commaSeparator',
                    key: 'sparePartDepreciation',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                      // label: `Spare Part Depreciation`,
                      disabled: false,
                    //   required: true,
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
                  type: 'commaSeparator',
                  key: 'discountonSpareParts',
                  defaultValue: '',
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  props: {
                    // label: `Discount on Spare Parts`,
                    disabled: false,
                  //   required: true,
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
                type: 'commaSeparator',
                key: 'totalAmountReplacement',
                defaultValue: '',
                className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                props: {
                  // label: `Total Amount Replacement`,
                  disabled: true,
                //   required: true,
                },
                // validators: {
                //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                // },
                hooks: {
                },
                expressions: {
                },
            },
                ]
              },

              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'commaSeparator',
                    key: 'repairLabour',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                     // label: ``,
                      disabled: true,
                    //   required: true,
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
                  type: 'commaSeparator',
                  key: 'disabled1',
                  defaultValue: '',
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  props: {
                   // label: ``,
                    disabled: true,
                  //   required: true,
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
                type: 'commaSeparator',
                key: 'repairLabourDiscountAmount',
                defaultValue: '',
                className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                props: {
                //  label: `Repair Labour Discount Amount`,
                  disabled: false,
                //   required: true,
                },
                // validators: {
                //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                // },
                hooks: {
                },
                expressions: {
                },
            },{
              type: 'commaSeparator',
              key: 'totalAmountRepairLabour',
              defaultValue: '',
              className: 'col-12 lg:col-3 md:col-3 xl:col-3',
              props: {
               // label: `Total Amount Repair Labour`,
                disabled: true,
              //   required: true,
              },
              // validators: {
              //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
              // },
              hooks: {
              },
              expressions: {
              },
          },
                ]
              },
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [ 
                  {
                    type: 'commaSeparator',
                    key: 'replacementCostDeductible',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                     // label: `Deductible Replacement Cost `,
                      disabled: false,
                    //   required: true,
                    },
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    // },
                    hooks: {
                    },
                    expressions: {
                    },
                },
                  ]},

                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [ 
                      {
                        type: 'commaSeparator',
                        key: 'repairLabourDeductible',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                         // label: `Deductible Replacement Cost `,
                          disabled: false,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                      ]},


                      {
                        fieldGroupClassName: 'grid',
                        fieldGroup: [ 
                          {
                            type: 'commaSeparator',
                            key: 'AccidentDeduction',
                            defaultValue: '',
                            className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                            props: {
                             // label: `Deductible Replacement Cost `,
                              disabled: false,
                            //   required: true,
                            },
                            // validators: {
                            //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                            // },
                            hooks: {
                            },
                            expressions: {
                            },
                        },
                          ]},
                          {
                            fieldGroupClassName: 'grid',
                            fieldGroup: [ 
                              {
                                type: 'commaSeparator',
                                key: 'salvageDeduction',
                                defaultValue: '',
                                className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                                props: {
                                 // label: `Deductible Replacement Cost `,
                                  disabled: false,
                                //   required: true,
                                },
                                // validators: {
                                //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                                // },
                                hooks: {
                                },
                                expressions: {
                                },
                            },
                              ]},

                          {
                            fieldGroupClassName: 'grid',
                            fieldGroup: [ 
                              {
                                type: 'commaSeparator',
                                key: 'DeductionTotal',
                                defaultValue: '',
                                className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                                props: {
                                 // label: `Deductible Replacement Cost `,
                                  disabled: true,
                                //   required: true,
                                },
                                // validators: {
                                //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                                // },
                                hooks: {
                                },
                                expressions: {
                                },
                            },
                              ]},

                {
                  fieldGroupClassName: 'grid',
                  fieldGroup: [ 
                   
                    {
                      type: 'commaSeparator',
                      key: 'disabled2',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        // label: `Total After Deduction`,
                        disabled: true,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                      type: 'commaSeparator',
                      key: 'VatRate1',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        // label: `VAT Rate Per`,
                        disabled: true,
                      // required: true,
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
                    type: 'commaSeparator',
                    key: 'VATRate',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                      // label: `VAT Rate`,
                      disabled: false,
                      // required: true,
                      options: [
      
                      ],
                    },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                  //   },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    type: 'commaSeparator',
                    key: 'VATAmount',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                      // label: `VAT Amount`,
                      disabled: false,
                      // required: true,
                      options: [
      
                      ],
                    },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                  //   },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  // {
                  //   type: 'commaSeparator',
                  //   key: 'totalWithVAT',
                  //   defaultValue: '',
                  //   className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  //   props: {
                  //     label: `VAT Total Amount`,
                  //     disabled: false,
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
                ]
              },


              {
                fieldGroupClassName: 'grid',
                fieldGroup: [ 
                  {
                    type: 'commaSeparator',
                    key: 'NetAmount',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                      // label: `Net Amount`,
                      disabled: false,
                    //   required: true,
                    },
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    // },
                    hooks: {
                    },
                    expressions: {
                    },
                },
               
                  ]},

                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [ 
                      {
                        type: 'commaSeparator',
                        key: 'AmountRecovered',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                         // label: `Deductible Replacement Cost `,
                          disabled: false,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                      ]},


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