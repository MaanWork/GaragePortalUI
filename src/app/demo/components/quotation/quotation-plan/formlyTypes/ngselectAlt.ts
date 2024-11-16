import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
       selector: 'display',
       template: `
       <div>
              <label>{{to.label}}</label><span *ngIf="to.required==true" class="text-danger">&nbsp;*</span>
                     <p-dropdown inputId="make" class="w-full w-full1" styleClass="w-full w-full1" [formControl]="formControl" [options]="to.options"
                        optionLabel="label" optionValue="label">
                     </p-dropdown>
                     </div>
 `,
})
export class NgSelectAlt extends FieldType {

}