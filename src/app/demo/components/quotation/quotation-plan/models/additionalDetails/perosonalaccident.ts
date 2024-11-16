import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";


export class PersonalAccident{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    dobDate: any;
    constructor() {
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (commonDetails) this.commonDetails = commonDetails;
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        this.dobDate = new Date(year - 18, month, day);
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields = [
          {
            
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        type: 'ngselect',
                        key: 'AccidentLocation',
                        defaultValue: '',
                        className: 'col-sm-4 col-lg-4 col-md-4',
                        props: {
                          label: `Location`,
                          required: true,
                          options: [
          
                          ],
          
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                      {
                        className: 'col-sm-8 col-lg-8 col-md-8',
                        type: 'input',
                        key: 'AccOccupation',
                        templateOptions: {
                          label: 'Occupation',
                          required: true,
                          disabled: true
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                        },
                      
                      },
                     
                      {
                        className: 'col-sm-4 col-lg-4 col-md-4',
                        type: 'input',
                        key: 'AccName',
                        templateOptions: {
                          label: 'Name',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                      
                      }, 
                      {
                        className: 'col-sm-4 col-lg-4 col-md-4',
                        type: 'commaSeparator',
                        key: 'AccSI',
                        templateOptions: {
                          label: 'Salary',
                          maxLength:15,
                          required: true,
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
                        className: 'col-sm-4 col-lg-4 col-md-4',
                        type: 'input',
                        key: 'AccNationID',
                        templateOptions: {
                          label: 'NationalityID',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                      },
                      {
                        className: 'col-sm-4 col-lg-4 col-md-4',
                        key: 'AccDob',
                        type: 'datepicker',
                        props: {
                          label: 'Date Of Birth',
                          required: true,
                          type: 'date',
                          datepickerOptions: {
                            max: this.dobDate
                          },
                        }
                      },
                     
                    ]
                  }
                ]
              }
            ]
         
          }
        ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else return false;
      
      }
}