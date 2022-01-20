import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public stocks :stockInfo[] = []; 
  private stockList: any[];

  constructor(private providerService: ProviderService) {
    
    this.providerService.getStocks().then(list => {
      this.stockList = list;
      for(let i =0; i < this.stockList.length; i++){
        this.createStockInfo(this.stockList[i]);
      }
    })
    // let fakeInfo = new stockInfo();
    // fakeInfo.companySymbol ="aaa"

    // this.stocks.push(fakeInfo);
    // console.log(this.stocks)
  }

  ngOnInit(): void {
   
  }

  async createStockInfo(address: any){
    let stock = new stockInfo()
    let receiveData
    await this.providerService.getStockByAddress(address).then(_data =>{
     receiveData = _data;
    })
    await receiveData.companySymbol().then( symbol => { stock.companySymbol = symbol});
    await receiveData.scAddr().then( scAddr => { stock.scAddr = scAddr});
    await receiveData.stockNum().then( stockNum => { stock.stockNum = stockNum});
    // stock.issueDate = receiveData.issueDate;
    this.stocks.push(stock);
    console.log(this.stocks);
  }

}

class stockInfo{
  public companySymbol: string;
  public scAddr: string;
  public stockNum: string;
  public issueDate: string
}
