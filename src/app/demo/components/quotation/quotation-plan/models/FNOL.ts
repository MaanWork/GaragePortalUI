import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FNOL {
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
                  //   className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  //   type: 'input',
                  //   id: 'policyNo',
                  //   key: 'policyNo',
                  //   hide: false,
                  //   hideExpression:false,
                  //   templateOptions: {
                  //     label: `Policy No`,
                  //     id: 'policyNo',
                  //     name:'policyNo',
                  //     // addonRight: {
                  //     //   class: 'fa fa-search',
                  //     // },
                  //     //placeholder: '-Select-',
                  //     required: true,
                  //     disabled: this.checkDisable('policyNo'),
                  //     maxLength: 30,
                  //     options:[],
                  //     // suffix: {
                  //     //   class: 'pi pi-search', // PrimeNG search icon
                  //     //  // onClick: () => this.onSearchClick(), // Function to handle search action
                  //     // },
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'input',
                    id: 'insuredName',
                    key: 'insuredName',
                    hide: false,
                    hideExpression:false,
                    templateOptions: {
                      label: `Insured Name`,
                      // placeholder: 'Enter Client Name',
                      required: true,
                      disabled: this.checkDisable('insuredName'),
                      maxLength: 100
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-1 lg:col-1 xl:col-1 pl-2 pr-2',
                    type: 'datepicker',
                    id: 'lossDate',
                    key: 'lossDate',
                    hide: false,
                    hideExpression:false,
                    //defaultValue: this.minDate,
                    templateOptions: {
                      type:'date',
                      label: `Loss Date`,
                      required: true,
                      // showTime: true, // Enables date + time selection
                      dateFormat: 'dd/mm/yy HH:mm:ss', // Display format
                      // hourFormat: '12', 
                      disabled: this.checkDisable('lossDate'),
                      datepickerOptions: {
                        //  hourFormat: '12',
                        //  timeOnly: true
                      },
                      
                    },
                   
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-1 lg:col-1 xl:col-1 mt-3-5',
                    type: 'timepicker',
                    //1label: 'lossTime',
                    key: 'lossTime',
                    hide: false,
                    hideExpression:false,
                    //defaultValue: this.minDate,
                    templateOptions: {
                      type:'time',
                      label: `Loss Time`,
                      required: true,
                      disabled: this.checkDisable('lossTime'),
                      datepickerOptions: {
                        // Additional options for the datepicker if necessary
                       // max:this.minDate,
                       hourFormat: '12',
                        showTime: true,
                        timeOnly: true
                      },
                      
                    },
                   
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2',
                    type: 'datepicker',
                    id: 'intimatedDate',
                    key: 'intimatedDate',
                    hide: false,
                    hideExpression:false,
                    //defaultValue: this.minDate,
                    templateOptions: {
                      type:'date',
                      label: `Intimated Date`,
                      required: true,
                      disabled: this.checkDisable('intimatedDate'),
                      datepickerOptions: {
                        // Additional options for the datepicker if necessary
                       // max:this.minDate,
                      },
                      
                    },
                   
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'input',
                    id: 'policeReportNo',
                    key: 'policeReportNo',
                    hide: true,
                    hideExpression:true,
                    templateOptions: {
                      label: `Police Report No`,
                      // placeholder: 'Enter Company Name',
                      required: true,
                      disabled: this.checkDisable('policeReportNo'),
                      maxLength: 100
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'lossLocation',
                    key: 'lossLocation',
                    hide: false,
                    hideExpression:false,
                    props: {
                      label: `Loss Location`,
                      id: 'lossLocation',
                      name:'lossLocation',
                      // placeholder: '-Select-',
                      required: false,
                      disabled: this.checkDisable('lossLocation'),
                     // maxLength: 2,
                      options:[]
                    },
                   
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'natureOfLoss',
                    key: 'natureOfLoss',
                    hide: false,
                    hideExpression:false,
                    props: {
                      label: `Nature Of Loss`,
                      id: 'natureOfLoss',
                      name:'natureOfLoss',
                      required: false,
                      disabled: this.checkDisable('natureOfLoss'),
                      maxLength: 50,
                      options:[]
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  // {
                  //   className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  //   type: 'ngselect',
                  //   id: 'policeStation',
                  //   key: 'policeStation',
                  //   // hide: true,
                  //   // hideExpression:true,
                  //   props: {
                  //     label: `Police Station`,
                  //     id: 'policeStation',
                  //     name:'policeStation',
                  //     // placeholder: '-Select Activities-',
                  //     required: true,
                  //     disabled: this.checkDisable('policeStation'),
                  //     maxLength: 50,
                  //     options:[]
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  // {
                  //   className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  //   type: 'input',
                  //   id: 'policeReportNo',
                  //   key: 'policeReportNo',
                  //   hide: false,
                  //   hideExpression:false,
                  //   props: {
                  //     label: `Police Report No`,
                  //     id: 'policeReportNo',
                  //     name:'policeReportNo',
                  //     // placeholder: '-Select Occupation-',
                  //     required: false,
                  //     disabled: this.checkDisable('policeReportNo'),
                  //     maxLength: 50,
                  //     options:[]
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    type: 'input',
                    id: 'lossDescription',
                    key: 'lossDescription',
                    hide: false,
                    hideExpression:false,
                    props: {
                      label: `Loss Description`,
                      id: 'lossDescription',
                      name:'lossDescription',
                      // placeholder: '-Select Occupation-',
                      required: false,
                      disabled: this.checkDisable('lossDescription'),
                      maxLength: 50,
                      options:[]
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                    key: 'atFault',
                    id: 'atFault',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      required: true,
                      disabled: this.checkDisable('atFault'),
                      name: 'atFault',
                    },
                    props: {
                      label: 'At Fault',
                      options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Oui' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Non' }],
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