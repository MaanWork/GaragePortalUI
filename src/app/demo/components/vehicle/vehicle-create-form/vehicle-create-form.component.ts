import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-create-form',
  templateUrl: './vehicle-create-form.component.html',
  styles : [`
    .card .form-container div label { font-weight: bold; }
    .flex input, .flex p-dropdown, .flex p-calendar, .flex p-inputNumber { min-width: 200px; }
  `],
  providers: [MessageService]
})
export class VehicleCreateFormComponent implements OnInit {
  items:MenuItem[] | undefined;
  customerTypes:any[] | undefined;
  currentCustomerType:any = 'personal';
  ownerCategoryOptions: any[] | undefined;
  selectedOwnerCategory: any | undefined;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.ownerCategoryOptions = [{name: 'Category', code: 'category'}];
    this.customerTypes = [{label: 'Personal', value: 'personal'}, {label: 'Corporate', value: 'corporate'}];
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle', routerLink: '/vehicle'}, { label: 'Create Vehicle' }];
  }

  submit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle Added Successfully' });
  }
}
