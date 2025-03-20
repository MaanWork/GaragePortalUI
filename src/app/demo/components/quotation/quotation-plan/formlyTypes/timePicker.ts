import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-timepicker-type',
  template: `
  <p-calendar class="w-full" styleClass="w-full"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [maxDate]="to.datepickerOptions?.max"
        [minDate]="to.datepickerOptions?.min"
        appendTo="body"
        [hourFormat]="to.datepickerOptions?.hourFormat"
        [showTime]="to.datepickerOptions?.showTime"
        [timeOnly]="to.datepickerOptions?.timeOnly"
       >
    </p-calendar>
    <div class="text-danger"  *ngIf="to.errors==true && to.required==true">This field is Required</div>
  `,
  // <span *ngIf="to.required==true" class="text-danger">&nbsp;*</span>
})
export class TimepickerTypeComponent extends FieldType {
  // Optional: only if you want to rely on `MatInput` implementation
  @ViewChild(MatInput) formFieldControl: MatInput;
  currentDate: any;
  minDate: any;

    constructor() {
    super();
    }
  
}
