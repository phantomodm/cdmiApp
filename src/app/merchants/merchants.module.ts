import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantsComponent } from './merchants.component';
import { MerchantsRoutingModule } from './merchants-routing.routing';


@NgModule({
  declarations: [
    MerchantsComponent
  ],
  imports: [
    CommonModule,
    MerchantsRoutingModule
  ]
})
export class MerchantsModule { }
