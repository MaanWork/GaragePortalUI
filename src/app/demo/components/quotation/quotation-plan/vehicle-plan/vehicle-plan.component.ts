import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface Plan {
  title:string;
  excess:number;
  totalSum:number;
  year:number;
  discount:number
}

@Component({
  selector: 'app-vehicle-plan',
  templateUrl: './vehicle-plan.component.html',
})
export class VehiclePlanComponent implements OnInit {
  plans:Plan[] = [
    { title: 'Cash/ Cheque etc', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Geographical Extension', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Electronic Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Other Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
  ];

  years:MenuItem[] = [];
  vehicles: MenuItem[] = [];

  sidebarVisible:boolean = false;

  ngOnInit() {
    this.years = [{label: '1 Year'}, {label: '2 Year'}];
    this.vehicles = [{label: 'Vehicle 1'}, {label: 'Vehicle 2'}];
  }

  showSidebar() {
    this.sidebarVisible = true;
  }
}
