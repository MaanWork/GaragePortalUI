import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent {
  constructor(private router: Router) {}

  navigateTo(location) {
    if(location == 'back') this.router.navigate(['/quotation']);
    else if(location == 'quote-plan') this.router.navigate(['/quotation/plan/main/vehicle']);
  }
}
