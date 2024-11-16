import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
})
export class PolicyTableComponent {
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;
  columns:string[] = []; 
  customers:any[] = []; 
  tableView = 'table';

  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Policy'}];
    this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}, {label: 'Delete',icon: PrimeIcons.TRASH}];
    this.columns = [ '-', 'Quotate No', 'Reference No', 'Vehicle No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Vehicle Count', 'Contacts'];
    this.customers = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];
  }
}
