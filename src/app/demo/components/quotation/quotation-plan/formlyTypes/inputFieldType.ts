import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display',
 template: `<div>
      
        <input type="text" [id]="field.key" pInputText [formControl]="formControl" 
        [formlyAttributes]="field"  class="w-full w-full1">
        <div class="text-danger"  *ngIf="to.errors==true && to.required==true">This field is Required</div>
 </div>`,
  //  <label>{{to.label}}</label><span *ngIf="to.required==true" class="text-danger">&nbsp;*</span>
})
export class InputFieldType extends FieldType {}