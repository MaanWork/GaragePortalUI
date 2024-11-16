import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../accesories/accesories.component";


export class Fidelitytwo{
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
                    fieldGroupClassName: 'grid',
                    fieldGroup: [
                        {
                            className: 'lg:col-3 md:col-3 col-12',
                            type: 'input',
                            key: 'EmpsName',
                            templateOptions: {
                              label: 'Employee Name',
                              required: true,
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                            },
                          
                       },
                      // {
                      //   type: 'ngselect',
                      //   key: 'EmpsOccupation',
                      //   defaultValue: '',
                      //   className: 'lg:col-4 md:col-4 col-12 mb-2',
                      //   props: {
                      //     label: `Occupation`,
                      //     required: true,
                      //     options: [
          
                      //     ],
          
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(500), ForceLengthValidators.min(1)]
                      //   },
                      //   hooks: {
                      //   },
                      //   expressions: {
                      //   },
                      // },
                      // {
                      //   className: 'lg:col-4 md:col-4 col-12 mb-1',
                      //   type: 'input',
                      //   key: 'EmpsAddress',
                      //   templateOptions: {
                      //     label: 'Address',
                      //     required: true,
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(500), ForceLengthValidators.min(1)]
                      //   },
                      
                      // }, 
                      // {
                      //   className: 'lg:col-4 md:col-4 col-12 mb-1',
                      //   type: 'input',
                      //   key: 'EmpsNationality',
                      //   templateOptions: {
                      //     label: 'Nationality ID',
                      //     required: true,
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                      //   },
                      
                      // }, 
                      // {
                      //   className: 'lg:col-4 md:col-4 col-12 mb-1',
                      //   key: 'EmpsDob',
                      //   type: 'datepicker',
                      //   props: {
                      //     label: 'Date Of Birth',
                      //     required: true,
                      //     type: 'date',
                      //     datepickerOptions: {
                      //       max: this.dobDate
                      //     },
                      //   }
                      // },
                      // {
                      //   type: 'ngselect',
                      //   key: 'EmpsJoin',
                      //   defaultValue: '',
                      //   className: 'lg:col-4 md:col-4 col-12 mb-1',
                      //   props: {
                      //     label: `Joining Period`,
                      //     required: true,
                      //     options: [
          
                      //     ],
          
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(25), ForceLengthValidators.min(1)]
                      //   },
                      //   hooks: {
                      //   },
                      //   expressions: {
                      //   },
                      // },
                      // {
                      //   className: 'lg:col-4 md:col-4 col-12 mb-1',
                      //   type: 'input',
                      //   key: 'EmpsPeriod',
                      //   templateOptions: {
                      //     label: 'Join Year',
                      //     required: true,
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(4), ForceLengthValidators.min(1)]
                      //   },
                      
                      // }, 
                      {
                        className: 'lg:col-2 md:col-2 col-12 mb-2',
                        type: 'commaSeparator',
                        key: 'EmpsSI',
                        templateOptions: {
                          label: 'Salary',
                          maxLength:15,
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(50), ForceLengthValidators.min(1)]
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