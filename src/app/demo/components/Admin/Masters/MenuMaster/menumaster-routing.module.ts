import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuNewDetailsComponent } from './Menu-details/menu-details.component';
import { MenuListComponent } from './Menu-list/menu-list.component';

const routes: Routes = [
 
  {
    path: '',
    component: MenuListComponent,
  },
  {
    path: 'newMenu',
    component: MenuNewDetailsComponent,
    data: {
            preload: true,
            title: "Menu Master",
            breadcrumb:  "Menu Master",
          }
  },
//   {
//     path: 'newDropdownDetails',
//     component: NewDropdownDetailsComponent,
//     data: {
//       preload: true,
//       title: "Update Dropdown Details",
//       breadcrumb:  "Update Dropdown Details",
//     }
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDetailsRoutingModule {}
