import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'displays',
 template: `
 <div style="text-align:right !important;display: block !important; padding-right: 10px !important;padding-top:12px !important;margin-left:-5px !important;cursor: pointer !important;">
        <span style="font-size:13px !important">{{field.templateOptions.label}}</span>
 </div>
 `,
})
export class DisplayLabels extends FieldType {
    
}