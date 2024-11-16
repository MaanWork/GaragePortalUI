import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
  <div class="flex flex-wrap justify-content-end">
      <div >
          
          <p-button label="Add New" styleClass="mr-3 p-button-outlined" (click)="add()"></p-button>
        
      </div>
   </div>
    <div>
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="grid" style="height:100px !important;">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="col-12 md:col-3 lg:col-3 xl:col-3" style="margin-top:29px !important;">
        <p-button label="Delete" styleClass="mb-3 p-button-outlined" *ngIf='i!=0' (click)="remove(i)"></p-button>
      </div>
      <hr class="m-0 p-0">
    </div>
    </div>
   
   
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
  endorsementSection:boolean=false;
  endorsementId: any=null;
  constructor(){
    super();
    let endorsementDetails = JSON.parse(sessionStorage.getItem('endorseTypeId'));
    console.log("Endorsements",endorsementDetails);
    if(endorsementDetails){
      this.endorsementSection = true;
      this.endorsementId = endorsementDetails?.EndtTypeId
    }
  }
}