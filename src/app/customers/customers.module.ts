import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MaterialModule } from '../flat-modules/material.module';
//import { CustomerTableComponent } from './customer-table/customer-table.component';
import { SiteUiModule } from '../site-ui/site-ui.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditdCustomerComponent } from './editd-customer/editd-customer.component';

@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerComponent,
    EditdCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SiteUiModule
  ]
})
export class CustomersModule { }
