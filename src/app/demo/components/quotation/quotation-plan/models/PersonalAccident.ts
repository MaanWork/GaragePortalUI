import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PersonalAccident{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';
    subuserType: any=null;dobDate:any=null;
    constructor() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
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
        this.fields={
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                //   {
                //     type: 'input',
                //     key: 'LocationName',
                //     defaultValue: '',
                //     className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //     templateOptions: {
                //       label: `Location`,
                //       required: true,
                //       placeholder: 'Enter LocationName',
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
                //     expressions: {
                //     },
                // },
                // {
                //   type: 'ngselect',
                //   key: 'Region',
                //   defaultValue: '',
                //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //   templateOptions: {
                //     label: `Region`,
                //     placeholder: 'Select Region',
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
                // {
                //   type: 'ngselect',
                //   key: 'District',
                //   defaultValue: '',
                //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //   templateOptions: {
                //     label: `District`,
                //     placeholder: 'Select District',
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
                  {
                    type: 'ngselect',
                    key: 'OccupationType',
                    defaultValue: '',
                    className: 'col-12 lg:col-5 md:col-5 xl:col-5',
                    templateOptions: {
                      label: `Occupation`,
                      placeholder: 'Select OccupationType',
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
                    type: 'input',
                    key: 'Name',
                    defaultValue: '',
                    className: 'col-12 lg:col-5 md:col-5 xl:col-5',
                    templateOptions: {
                      label: `Name`,
                      placeholder: 'Enter Name',
                      required: true,
                      
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
                  className: 'col-12 lg:col-5 md:col-5 xl:col-5',
                  type: 'datepicker',
                  key: 'Dob',
                  
                  templateOptions: {
                    label: `Date Of Birth`,
                    required: true,
                    placeholder: 'Select Date Of Birth',
                    disabled: this.checkDisable('Dob'),
                    defaultValue:  this.dobDate,
                    datepickerOptions: {
                      max: this.dobDate
                    },
                    customDatePickerOption: {
                      appendTo: 'body' 
                    }
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                 
                },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-5 md:col-5 xl:col-5',
                    key: 'SumInsured',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Sum Insured`,
                      maxLength: 15,
                      disabled: this.checkDisable('SumInsured'),
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