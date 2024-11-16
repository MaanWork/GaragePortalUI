import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display',
 template: `
       <label class="input-form-label" >{{to.label}}</label>
       <div class="grid">
       <div class="md:col-12 lg:col-12 xl:col-12 col-12">
       <p-selectButton [options]="to.options" [formControl]="formControl" 
       [formlyAttributes]="field" optionLabel="label" optionValue="value"></p-selectButton>
       </div></div>
       <!-- <div class="grid m-0 p-0">
              <div class="md:col-6 lg:col-6 xl:col-6 col-12"  *ngFor="let option of to.options">
                     <div class="flex flex-wrap justify-content-start" style="border:1px solid lightgrey;margin:2px !important;border-radius:10px !important;max-height:200px;overflow-y:scroll">
                            <div style="margin:8px !important">
                                   <input type="radio" class="customRadioButton"
                                   [name]="to.name"
                                   [formControl]="formControl" 
                                   [formlyAttributes]="field"
                                   [value]="option.value">
                            </div>
                            <div class="customRadioBox d-flex flex-row" style="flex-wrap:wrap !important">
                            
                                   <ng-container *ngFor="let val of option.list">
                                   <div class="input-form-radio-box mt-1">
                                          <div class="radio-toolbar" style="min-width:auto !important;">
                                                 <label class="yes_alt">{{val}}</label>
                                          </div>   
                                   </div>&nbsp;&nbsp;
                                   </ng-container>
                            </div>
                     </div>  
              </div>
       </div> -->
 `,
})
export class RadioList extends FieldType {
    
}