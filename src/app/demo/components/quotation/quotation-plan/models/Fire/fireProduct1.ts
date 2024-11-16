import { DatePipe } from "@angular/common";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomerCreateFormComponent } from "src/app/demo/components/customer/customer-create-form/customer-create-form.component";

export class FIreProduct1{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];
    currentDate: any;
    minDate: any;
    finalizeYN: any='N';
    
    constructor() {
      var d= new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
       this.currentDate = new Date();
      // this.minDobDate =
      this.minDate = new Date(year - 18,month, day );
      let finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.fields={
            props: { label: 'Risk Details' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid mt-2',
                fieldGroup: [
                    {
                        className: 'col-12 md:col-6 lg:col-6 xl:col66 ',
                        type: 'datepicker',
                        id: 'EffectiveStartDate',
                        key: 'EffectiveStartDate',
                        // hide: false,
                        // hideExpression:false,
                        // defaultValue: this.minDate,
                        templateOptions: {
                          type:'date',
                          label: `Effective Start Date`,
                          required: true,
                          disabled: this.checkDisable('EffectiveStartDate'),
                          maxLength: 15,
                        //   datepickerOptions: {
                        //     // Additional options for the datepicker if necessary
                        //     max:this.minDate,
                        //   },
                          
                        },
                       
                        validators: {
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                        type: 'datepicker',
                        id: 'EffectiveEndDate',
                        key: 'EffectiveEndDate',
                        // hide: false,
                        // hideExpression:false,
                        // defaultValue: this.minDate,
                        templateOptions: {
                          type:'date',
                          label: `Effective End Date`,
                          required: true,
                          disabled: this.checkDisable('EffectiveEndDate'),
                          maxLength: 15,
                        //   datepickerOptions: {
                        //     // Additional options for the datepicker if necessary
                        //     max:this.minDate,
                        //   },
                          
                        },
                       
                        validators: {
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'ngselect',
                    id: 'RiskType',
                    key: 'RiskType',
                    // hide: false,
                    // hideExpression:false,
                    templateOptions: {
                      label: `Risk Type`,
                      id: 'RiskType',
                      name:'RiskType',
                      // placeholder: '-Select-',
                      required: false,
                      disabled: this.checkDisable('RiskType'),
                      maxLength: 15,
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'ngselect',
                    id: 'LoctionName',
                    key: 'LoctionName',
                    // hide: false,
                    // hideExpression:false,
                    templateOptions: {
                      label: `Risk Loction`,
                      id: 'LoctionName',
                      name:'LoctionName',
                      // placeholder: '-Select-',
                      required: true,
                      disabled: this.checkDisable('LoctionName'),
                      maxLength: 15,
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'ngselect',
                    id: 'Occupation',
                    key: 'Occupation',
                    // hide: false,
                    // hideExpression:false,
                    templateOptions: {
                      label: `Occupation`,
                      id: 'Occupation',
                      name:'Occupation',
                      // placeholder: '-Select-',
                      required: true,
                      disabled: this.checkDisable('Occupation'),
                      maxLength: 15,
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'input',
                    id: 'Floors',
                    key: 'Floors',
                    // hide: false,
                    // hideExpression:false,
                    templateOptions: {
                      label: `Floors`,
                      // placeholder: 'Enter Client Name',
                      required: false,
                      disabled: this.checkDisable('Floors'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'ScopeOfCover',
                    key: 'ScopeOfCover',
                    // hide: true,
                    // hideExpression:true,
                    templateOptions: {
                      label: `Scope Of Cover`,
                      // placeholder: 'Enter Company Name',
                      required: true,
                      disabled: this.checkDisable('ScopeOfCover'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'Remarks',
                    key: 'Remarks',
                    // hide: true,
                    // hideExpression:true,
                    templateOptions: {
                      label: `Remarks`,
                      // placeholder: 'Enter Company Name',
                      required: true,
                      disabled: this.checkDisable('Remarks'),
                      maxLength: 50
                    },
                    
                    validators: {
                    },
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
                        className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
                        key: 'Sprinkler',
                        id: 'Sprinkler',
                        type: 'radioList',
                        templateOptions: {
                          type: 'Sprinkler',
                          required: true,
                          disabled: this.checkDisable('Sprinkler'),
                          name: 'Sprinkler',
                        },
                        props: {
                          label: 'Sprinkler',
                          options: [{ value: 'Y', label: 'YES', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                        }
                      },
                      {
                        className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
                        key: 'Extinguisher',
                        id: 'Extinguisher',
                        type: 'radioList',
                        templateOptions: {
                          type: 'Extinguisher',
                          required: true,
                          disabled: this.checkDisable('Extinguisher'),
                          name: 'Extinguisher',
                        },
                        props: {
                          label: 'Extinguisher',
                          options: [{ value: 'Y', label: 'YES', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                        }
                      },
                      {
                        className: 'col-12 md:col-4 lg:col-4 xl:col-4 ',
                        key: 'Hydrant',
                        id: 'Hydrant',
                        type: 'radioList',
                        templateOptions: {
                          type: 'Hydrant',
                          required: true,
                          disabled: this.checkDisable('Hydrant'),
                          name: 'Hydrant',
                        },
                        props: {
                          label: 'Hydrant',
                          options: [{ value: 'Y', label: 'YES', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                        }
                      },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'ngselect',
                    id: 'IndemnityPeriodUnit',
                    key: 'IndemnityPeriodUnit',
                    props: {
                      label: `Indemnity Period Unit`,
                      id: 'IndemnityPeriodUnit',
                      name:'IndemnityPeriodUnit',
                      // placeholder: '-Select-',
                      required: false,
                      disabled: this.checkDisable('IndemnityPeriodUnit'),
                      maxLength: 15,
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'IndemnityPeriod',
                    key: 'IndemnityPeriod',
                    templateOptions: {
                      label: `Indemnity Period`,
                      // placeholder: 'Enter ID Number',
                      required: true,
                      disabled: this.checkDisable('IndemnityPeriod'),
                      maxLength: 16
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'PMLPre',
                    key: 'PMLPre',
                    templateOptions: {
                      label: `PML %`,
                      // placeholder: 'Enter ID Number',
                      required: true,
                      disabled: this.checkDisable('PMLPre'),
                      maxLength: 16
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'PMLAmount',
                    key: 'PMLAmount',
                    templateOptions: {
                      label: `PML Amount`,
                      // placeholder: 'Enter ID Number',
                      required: true,
                      disabled: this.checkDisable('PMLAmount'),
                      maxLength: 16
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    key: 'SurveyCompletedYN',
                    id: 'SurveyCompletedYN',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      required: true,
                      disabled: this.checkDisable('SurveyCompletedYN'),
                      name: 'SurveyCompletedYN',
                    },
                    props: {
                      label: 'Survey Completed Y/N',
                      options: [{ value: 'Y', label: 'YES', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                    }
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    key: 'WatchManYN',
                    id: 'WatchManYN',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      required: true,
                      disabled: this.checkDisable('WatchManYN'),
                      name: 'WatchManYN',
                    },
                    props: {
                      label: 'WatchMan Y/N',
                      options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                    }
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'input',
                    id: 'PremiumDisplay',
                    key: 'PremiumDisplay',
                    // hide: true,
                    // hideExpression:true,
                    templateOptions: {
                      label: `Premium Display`,
                      // placeholder: 'Enter Tax Excempted Number',
                      required: true,
                      disabled: this.checkDisable('PremiumDisplay'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6 ',
                    type: 'ngselect',
                    id: 'ConstuctionType',
                    key: 'ConstuctionType',
                    templateOptions: {
                      label: `Constuction Type`,
                      id: 'ConstuctionType',
                      name:'ConstuctionType',
                      // placeholder: '-Select-',
                      required: false,
                      disabled: this.checkDisable('ConstuctionType'),
                      maxLength: 15,
                      options:[
                       
                      ]
                    },
                    
                    validators: {
                    },
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    type: 'input',
                    id: 'Address',
                    key: 'Address1',
                    templateOptions: {
                      label: `Address`,
                      // placeholder: 'Enter Street',
                      required: true,
                      disabled: this.checkDisable('Address1'),
                      maxLength: 500
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 xl:col-3 ',
                    type: 'ngselect',
                    id: 'City',
                    key: 'CityName',
                    props: {
                      label: `City`,
                      id: 'City',
                      name:'City',
                      required: false,
                      disabled: this.checkDisable('CityName'),
                      maxLength: 15,
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
                    className: 'col-12 md:col-3  lg:col-3 xl:col-3 ',
                    type: 'ngselect',
                    id: 'Country',
                    key: 'Country',
                    props: {
                      label: `Country`,
                      id: 'Country',
                      name:'Country',
                      // placeholder: '-Select-',
                      required: false,
                      disabled: this.checkDisable('Country'),
                      maxLength: 15,
                      options:[]
                    },
                  
                    validators: {
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