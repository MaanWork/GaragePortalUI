import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GarageLogin {
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
                  // {
                  //   type: 'input',
                  //   key: 'CoreAppCode',
                  //   defaultValue: '',
                  //   className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  //   props: {
                  //     label: `Core App Code`,
                  //     disabled: false,
                  //     required: true,
                  //     options: [
      
                  //     ],
                  //   },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(50), ForceLengthValidators.min(1)]
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  // {
                  //   type: 'button',
                  //   key: 'SearchValue',
                  //   className: 'col-12 lg:col-1 md:col-1 xl:col-1',
                  //   props: {
                  //     label: `Search`,
                  //     icon: 'pi pi-search', // Assuming you are using PrimeIcons
                  //     disabled: false,
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                    {
                        type: 'input',
                        key: 'UserName',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `User Name`,
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
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'MobileNumber',
                        templateOptions: {
                          label: 'Mobile Number',
                          disabled: false,
                        //   required: false,
                        },
                         validators: {
                          validation: [ForceLengthValidators.maxLength(16), ForceLengthValidators.min(1)]
                        },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'EmailId',
                        templateOptions: {
                          label: 'Email Id',
                          disabled: false,
                        //   required: false,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        // },
                    },
                    // {
                    //     type: 'input',
                    //     key: 'TINNumber',
                    //     defaultValue: '',
                    //     className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        
                    //     props: {
                    //       label: `TIN Number`,
                    //       disabled: false,
                    //       required: true,
                    //       options: [
          
                    //       ],
                    //     },
                    //     // validators: {
                    //     //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    //     // },
                    //     hooks: {
                    //     },
                    //     expressions: {
                    //     },
                    // },
                    {
                      type: 'input',
                      key: 'Address',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        label: `Address`,
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
                        type: 'ngselect',
                        key: 'City',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `City`,
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
                        type: 'ngselect',
                        key: 'Country',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `Country`,
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
                        type: 'input',
                        key: 'LoginId',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `Login Id`,
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
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3 p-3 ',
                      key: 'changePassYN',           
                      type: 'radioList',
                      hide:true,
                      hideExpression:true,
                      templateOptions: {
                        type: 'radioList',
                        required: true,
                        disabled: this.checkDisable('changePassYN'),
                        name: 'changePassYN',
                      },
                      props: {
                        label: 'Do You want Cahnge password?',
                        options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                      }
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'Password',
                        hide:false,
                        hideExpression:false,
                        templateOptions: {
                          label: 'Password',
                          disabled: false,
                        //   required: false,
                        },
                        //  validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'RePassword',
                        hide:false,
                        hideExpression:false,
                        templateOptions: {
                          label: 'Re-Password',
                          disabled: false,
                        //   required: false,
                        },
                        //  validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                    },

                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'ngselect',
                        key: 'Branch',
                        templateOptions: {
                          label: 'Attached Company Branches ',
                          disabled: false,
                          options: [
          
                          ],
                        //   required: false,
                        },
                         validators: {
                          validation: [ForceLengthValidators.maxLength(16), ForceLengthValidators.min(1)]
                        },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'ContactPersonName',
                        templateOptions: {
                          label: 'Contact Person Name',
                          disabled: false,
                        //   required: false,
                        },
                        //  validators: {
                        //   validation: [ForceLengthValidators.maxLength(16), ForceLengthValidators.min(1)]
                        // },
                    },
                    
                    // {
                    //     className: 'col-12 lg:col-3 md:col-3 xl:col-3  pl-2 pr-2 pt-1',
                    //     key: 'TaxExcempted',           
                    //     type: 'radioList',
                    //     templateOptions: {
                    //       type: 'radioList',
                    //       required: true,
                    //       disabled: this.checkDisable('TaxExcempted'),
                    //       name: 'TaxExcempted',
                    //     },
                    //     props: {
                    //       label: 'Tax Excempted',
                    //       options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                    //     }
                    //   },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3 pl-2 pr-2 pt-1',
                        type: 'datepicker',
                        key: 'EffectiveDate',
                        // hide: true,
                        // hideExpression:true,
                        templateOptions: {
                          type: 'date',
                          label: `Effective Date`,
                          placeholder: 'Effective Date',
                          required: true,
                          disabled: this.checkDisable('EffectiveDate'),
                          maxLength: 50
                        },
                        
                        validators: {
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                      {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'textarea',
                        key: 'Remarks',
                        templateOptions: {
                          label: 'Remarks',
                          disabled: false,
                        //   required: false,
                        },
                        //  validators: {
                        //   validation: [ForceLengthValidators.maxLength(16), ForceLengthValidators.min(1)]
                        // },
                    },
                      {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3  pl-2 pr-2 pt-1',
                        key: 'status',           
                        type: 'radioList',
                        templateOptions: {
                          type: 'radioList',
                          required: true,
                          disabled: this.checkDisable('status'),
                          name: 'status',
                        },
                        props: {
                          label: 'Status',
                          options: [{ value: 'Y', label: 'Active' }, { value: 'N', label: 'DeActive' }],
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
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}