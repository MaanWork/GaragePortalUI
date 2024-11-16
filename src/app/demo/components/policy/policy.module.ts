import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      TableModule,
      TabViewModule,
      BreadcrumbModule,
      DividerModule,
      ButtonModule,
      InputTextModule,
      CheckboxModule,
      ChipModule
    ]
  })
  export class PolicyModule { }