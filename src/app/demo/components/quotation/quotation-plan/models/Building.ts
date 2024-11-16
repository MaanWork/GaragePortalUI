import { FormlyFieldConfig } from "@ngx-formly/core";

export class Building{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';subuserType:any=null;
    constructor() {
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
          props: { label: 'Building Risk' },
          // fieldGroup: [
          //   {
          //     fieldGroupClassName: 'grid mt-2',
          //       fieldGroup: [
          //         {
          //           className: 'col-12 md:col-6 lg:col-6 p-2',
          //           type: 'displays',
            
          //           templateOptions: {
          //             label: `Building Usage`,
          //             required: true,
  
          //           },
          //         },
          //         {
          //           className: 'col-12 md:col-4 lg:col-4',
          //                   type: 'ngselect',
          //                   key: 'BuildingUsageId',
          //                   props: {
          //                     //label: 'Building Usage',
          //                     //hideExpression: "model.BuildingOwnerYn =='N'",
          //                     disabled: this.checkDisable('BuildingUsageId'),
          //                     //required: true,
          //                     options: [
          //                     ],
          //                   },
          //                   expressions: {
            
          //                   },
          //         }
          //       ]
          //   },
          //   {
          //     fieldGroupClassName: 'grid mt-2',
          //       fieldGroup: [
          //         {
          //           className: 'col-12 md:col-6 lg:col-6 p-2',
          //           type: 'displays',
            
          //           templateOptions: {
          //             label: `Built Year`,
          //             required: false,
  
          //           },
          //         },
          //         {
          //           className: 'col-12 md:col-4 lg:col-4',
          //                   type: 'input',
          //                   key: 'BuildingBuildYear',
          //                   props: {
          //                     // label: 'Built Year',
          //                     placeholder: "YYYY",
          //                     // required: false,
          //                     maxLength: 4,
          //                     pattern: /[0-9]+/gm,
          //                     disabled: this.checkDisable('BuildingBuildYear'),
          //                     options: [
          //                     ],
          //                   },
          //                   validation: {
          //                     messages: {
          //                     },
          //                   },
          //                   expressions: {
            
          //                   },
          //         }
          //       ]
          //   },
          //   {
          //     fieldGroupClassName: 'grid mt-2',
          //       fieldGroup: [
          //         {
          //           className: 'col-12 md:col-6 lg:col-6 p-2',
          //           type: 'displays',
            
          //           templateOptions: {
          //             label: `Construction (Wall)`,
          //             required: false,
  
          //           },
          //         },
          //         {
          //           className: 'col-12 md:col-4 lg:col-4',
          //                   type: 'ngselect',
          //                   key: 'WallType',
          //                   props: {
          //                     //label: 'Construction (Wall)',
          //                     disabled: this.checkDisable('WallType'),
          //                     //required: false,
          //                     options: [
          //                     ],
          //                   },
          //                   expressions: {
            
          //                   },
                  
          //         }
          //       ]
          //   },
          //   {
          //     fieldGroupClassName: 'grid mt-2',
          //       fieldGroup: [
          //         {
          //           className: 'col-12 md:col-6 lg:col-6 p-2',
          //           type: 'displays',
            
          //           templateOptions: {
          //             label: `Construction (Roof)`,
          //             required: true,
  
          //           },
          //         },
          //         {
          //                 className: 'col-12 md:col-4 lg:col-4',
          //                   type: 'ngselect',
          //                   key: 'RoofType',
          //                   props: {
          //                     // label: 'Construction (Roof)',
          //                     disabled: this.checkDisable('RoofType'),
          //                     // required: false,
          //                     options: [
          //                     ],
          //                   },
          //                   expressions: {
            
          //                   },
          //         }
          //       ]
            // },
            // {
            //   fieldGroupClassName: 'grid mt-2',
            //     fieldGroup: [
            //       {
            //         className: 'col-12 md:col-6 lg:col-6 p-2',
            //         type: 'displays',
            
            //         templateOptions: {
            //           label: `Building Sum Insured`,
            //           required: true,
  
            //         },
            //       },
                  // {
                  //   className: 'col-12 md:col-4 lg:col-4',
                  //   type: 'commaSeparator',
                  //   key: 'BuildingSuminsured',
                  //   templateOptions: {
                  //     //label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
                  //     //required: true,
                  //     disabled: this.checkDisable('BuildingSuminsured'),
                  //     maxLength: 15
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
    
          //           },
    
          //           expressions: {
                      
          //           },
          //         }
          //       ]
          //   }
          // ]
          fieldGroup: [
            {
              fieldGroupClassName: 'newclassname',
              fieldGroup: [
                // {
                //   className: 'w-full md:mt-0 mt-3 md:w-1/3',
                //   type: 'ngselect',
                //   key: 'BuildingUsageId',
                //   props: {
                //     label: 'Building Usage',
                //     //hideExpression: "model.BuildingOwnerYn =='N'",
                //     disabled: this.checkDisable('BuildingUsageId'),
                //     required: true,
                //     options: [
                //     ],
                //   },

                //   expressions: {
  
                //   },
                // },
                // {
                //   className: 'w-full md:mt-0 mt-5 mdw-5',
                //   type: 'input',
                //   key: 'BuildingBuildYear',
                //   props: {
                //     label: 'Built Year',
                //     placeholder: "YYYY",
                //     required: true,
                //     maxLength: 4,
                //     pattern: /[0-9]+/gm,
                //     disabled: this.checkDisable('BuildingBuildYear'),
                //     options: [
                //     ],
                //   },
                //   validation: {
                //     messages: {
                //     },
                //   },
                //   expressions: {
  
                //   },
                // },
                // {
                //   className: 'w-full md:mt-0 mt-3 md:w-1/3',
                //   type: 'ngselect',
                //   key: 'WallType',
                //   props: {
                //     label: 'Construction (Wall)',
                //     disabled: this.checkDisable('WallType'),
                //     required: false,
                //     options: [
                //     ],
                //   },
                //   expressions: {
  
                //   },
                // },
                // {
                //   className: 'w-full md:mt-0 mt-3 md:w-1/3',
                //   type: 'ngselect',
                //   key: 'RoofType',
                //   props: {
                //     label: 'Construction (Roof)',
                //     disabled: this.checkDisable('RoofType'),
                //     required: false,
                //     options: [
                //     ],
                //   },
                //   expressions: {
  
                //   },
                // },
                {
                  className: 'w-full md:mt-0 mt-3 mdw4',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    label: `Building Sum Insured`,
                    required: true,
                    disabled: this.checkDisable('BuildingSuminsured'),
                    maxLength: 15
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    
                  },
                }
  
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