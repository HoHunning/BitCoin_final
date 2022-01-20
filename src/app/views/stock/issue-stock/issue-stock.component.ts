import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'app-issue-stock',
  templateUrl: './issue-stock.component.html',
  styleUrls: ['./issue-stock.component.scss']
})
export class IssueStockComponent implements OnInit {

  curDate: Date = new Date();
  numOfShares: number = null;
  companyName:string = null;
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
  }

  clear(){
    console.log(this.numOfShares);
    this.numOfShares = null;
    this.companyName = null;
  }
  issue(){
    if(!this.checkEmpty()){
      console.log("issue")

      this.providerService.issueStock(this.companyName, this.numOfShares).then( () =>{
        this.providerService.getStocks().then(list => {
          console.log(list);
        })})
        // this.clear();
    }

  }

  checkEmpty(): boolean{
    if(this.companyName == null || this.numOfShares == null) return true
    return false;
  }

}
