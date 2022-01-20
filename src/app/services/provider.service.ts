import { Injectable } from '@angular/core';
import Web3 from 'web3'
import { take } from 'rxjs/operators'
import { Observable, from } from 'rxjs';
import SCFactory from "../../contracts/SCFactory.json"
import StockCertificate from "../../contracts/StockCertificate.json"
import { ContractFactory, ethers, Signer } from 'ethers';

declare let window :any;
const factoryAddress = "0x3136b8a1af2E0a78bE03Bca9fe157c3682066f2B";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  
  private ethereum: any = null;
  private account: string;
  private web3: any;
  private factory: any;
  private provider: any;
  private signer: any;
  public stockList: any[];
  
  
  

  constructor() { 
    this.ethereum = window.ethereum;
    if(typeof this.ethereum === "undefined"){
      alert("No Metamesk!");
    }
    else{
      this.web3 = new Web3(this.ethereum);
      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      this.signer = this.provider.getSigner();
      this.factory = this.getFactory(SCFactory.abi, SCFactory.bytecode);
      this.provider.getSigner().getAddress().then( account => {
        this.account = account;
        console.log(this.account);
      });
      console.log(this.factory);
      
    }
    
  }

  public getFactory(abi: any, byteCode: any) {
    return new ethers.Contract( factoryAddress, abi ,this.signer);

  }

  async issueStock(companyName: string, numOfShares: number) {
    this.factory.create(this.account,companyName, numOfShares)
  }

  async getStocks(){
    let list
    let data;
    await this.factory.getList().then(
      _list => { 
        console.log("finish")
        console.log(_list)
        list = _list }
    );
    // await data.companySymbol().then(symbol =>
    //   {console.log(symbol)})
    return list
  }

  async getStockByAddress(address: string){
    return new ethers.Contract( address, StockCertificate.abi, this.signer)
  }

  public getAccount():Observable<any>{
    return from(this.ethereum.request( { method : 'eth_requestAccounts'}));
  }
}
