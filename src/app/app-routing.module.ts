import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: '/home', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)},
  {path: '/clients', loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule)},
  {path: '/library', loadChildren: () => import('./library/library.module').then((m) => m.LibraryModule)},
  {path: '/merchants', loadChildren: () => import('./merchants/merchants.module').then((m) => m.MerchantsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
