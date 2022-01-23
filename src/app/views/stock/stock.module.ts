import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { IssueStockComponent } from './issue-stock/issue-stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateMultisigWalletComponent } from './create-multisig-wallet/create-multisig-wallet.component';
import { MutisigWalletDetailComponent } from './mutisig-wallet-detail/mutisig-wallet-detail.component';


@NgModule({
  declarations: [
    StockComponent,
    IssueStockComponent,
    DashboardComponent,
    CreateMultisigWalletComponent,
    MutisigWalletDetailComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
