import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
})
export class VehicleTableComponent {
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;

  tableView = 'table';

  allVehicles:any[] = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];

  columns:string[] = [
    '-',
    'Vehicle ID', 
    'Reference No', 
    'Chasis No', 
    'Registration No', 
    'Policy Type', 
    'Make', 
    'Model', 
    'Premium TZS',
    'Action'
  ];

  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' } , {label:'Vehicle'}];
    this.tableActions = [{label:'View'}, {label:'Edit'}, {label: 'delete'}];
  }
}
