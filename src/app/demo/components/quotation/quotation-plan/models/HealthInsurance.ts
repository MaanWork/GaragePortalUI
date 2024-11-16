import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class HealthInsurance{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';dobDate:any=null;
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
        this.fields = [
          {
            fieldGroup: [
              {
                props: { label: 'Health Insurance' },
                // fieldGroup: [
                //   {
                //     fieldGroupClassName: 'repeat',
                //      key: 'patientList',
                //     fieldGroup: [
                //       {
                //         className: 'w-full md:mt-0 mt-5 mdw-5 ml-4 mr-4',
                //         type: 'ngselect',
                //         key: 'RelationType',
                //         defaultValue: '',
                //         props: {
                //           label: 'Relation Type',
                //           disabled: this.checkDisable('BuildingUsageId'),
                //           required: true,
                //           options: [
                //           ],
                //         },
      
                //         expressions: {
        
                //         },
                //         hooks: {
                //       },
                //       },
                //       {
                //         className: 'w-full md:mt-0 mt-5 mdw-5 ml-4 mr-4',
                //         type: 'input',
                //         key: 'NickName',
                //         props: {
                //           label: 'Nick Name',
                //           disabled: this.checkDisable('WallType'),
                //           required: false,
                //           options: [
                //           ],
                //         },
                //         expressions: {
        
                //         },
                //         hooks: {
                //         },
                //       },
                //       {
                //         className: 'w-full md:mt-0 mt-3 md:w-1/3 ml-4 mr-4',
                //         type: 'datepicker',
                //         key: 'DateOfBirth',
                //         defaultValue: '',
                //         templateOptions: {
                //          defaultValue: '',
                //           },
                //           props: {
                //           label: 'Date Of Birth',
                //            required: true,
                //           type: 'date',
                //           datepickerOptions: {
                //           defaultValue: '',
                //            max: ''
                //            },
                //       },
                //       hooks: {
                //       },
                //     }
                  
                //     ]
                //   }
                // ]
                fieldGroup: [
                  {
                    key: 'patientList',
                    type: 'repeat',
                    
                    templateOptions: {
                      addText: 'Add Patient',
                    },
                    fieldArray: {
                      fieldGroup: [
                        {
                          fieldGroupClassName: 'grid mt-2',
                          fieldGroup: [
                            {
                              type: 'ngselect',
                              key: 'RelationType',
                              defaultValue: '',
                              className: 'col-12 md:col-3 lg:col-3 xl:col-3',
                              //col-sm-12 col-md-6 col-lg-4
                              props: {
                                label: `Relation Type`,
                                disabled: this.checkDisable('RelationType'),
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
                              className: 'col-12 md:col-3 lg:col-3 xl:col-3',
                              //col-sm-12 col-md-6 col-lg-4',
                              key: 'NickName',
                              defaultValue: '',
                              props: {
                                label: `Nickname`,
                                maxLength: 15,
                                disabled: this.checkDisable('NickName'),
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
                              className: 'col-12 md:col-3 lg:col-3 xl:col-3',
                              //col-sm-12 col-md-6 col-lg-4
                                key: 'DateOfBirth',
                                type: 'datepicker',
                                defaultValue: '',
                                templateOptions: {
                                  defaultValue: '',
                                },
                                props: {
                                  label: 'Date Of Birth',
                                  
                                  required: true,
                                  type: 'date',
                                  datepickerOptions: {
                                    defaultValue: '',
                                    max: ''
                                  },
                                }
                              },
                          ]
                        }
                      ],
                    },
                  },
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
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}