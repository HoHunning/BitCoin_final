import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueStockComponent } from './issue-stock/issue-stock.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  { path: 'issueStock', component: IssueStockComponent},
  { path: 'dashboard', component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
