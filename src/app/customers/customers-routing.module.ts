import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersComponent } from './customers.component';
import { EditdCustomerComponent } from './editd-customer/editd-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CustomersComponent },
      { path: 'add', component: AddCustomerComponent },
      { path: 'customer/:id', component: EditdCustomerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
