import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <br><textarea pInputTextarea
              [id]="id"
              [formControl]="formControl"
              cols="60"
              rows="2"
              [placeholder]="to.placeholder"
              [formlyAttributes]="field"></textarea>
      <div class="text-danger"  *ngIf="to.errors==true && to.required==true">This field is Required</div>
  `
})

export class TextareaTypeComponent extends FieldType implements OnInit {
  ngOnInit() {
  }
}