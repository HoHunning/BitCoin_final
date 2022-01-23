import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMultisigWalletComponent } from './create-multisig-wallet/create-multisig-wallet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueStockComponent } from './issue-stock/issue-stock.component';
import { MutisigWalletDetailComponent } from './mutisig-wallet-detail/mutisig-wallet-detail.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  { path: 'issueStock', component: IssueStockComponent},
  { path: 'dashboard', component : DashboardComponent},
  { path: "multisigWalletDetail", component: MutisigWalletDetailComponent},
  { path: "createMultisigWallet", component: CreateMultisigWalletComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
