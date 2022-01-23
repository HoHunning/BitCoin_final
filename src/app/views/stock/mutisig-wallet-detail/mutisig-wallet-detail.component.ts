import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderService, Transaction } from '../../../services/provider.service';
import { DeployTokenContractDialogComponent } from '../../../modal/deploy-token-contract/deploy-token-contract.component';


@Component({
  selector: 'app-mutisig-wallet-detail',
  templateUrl: './mutisig-wallet-detail.component.html',
  styleUrls: ['./mutisig-wallet-detail.component.scss']
})
export class MutisigWalletDetailComponent implements OnInit {
  multisigWallet : any | null = null;
  multisigWalletAddress : string | null = null;
  owners: string [] | null = null;
  balance: string | null = null;
  confirmationsRequired: string |null = null;
  transactions: Transaction[] | null = null;
  canExecute: boolean[] = [];

  getMultiSigWalletForm = this.fb.group({
    address: [null, [Validators.required]]
  });

  depositeToMultiSigWalletForm = this.fb.group({
    value : [null, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private web3Service: ProviderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMultiSigWalletInfo();
  }

  connectToMultiSigWallet(){
    this.getMultiSigWalletForm.value

    console.log("### connecting address : " ,this.getMultiSigWalletForm.value )

    this.web3Service.connectToContract(this.getMultiSigWalletForm.value.address).then( address => {
      this.multisigWalletAddress = address;
    })

    this.getMultiSigWalletInfo();

  }

  depositeToMultiSigWallet(){

    let address = "0x0"
    if( null !== this.multisigWalletAddress){
      address = this.multisigWalletAddress;
    }

    console.log( this.depositeToMultiSigWalletForm.value.value);
    this.web3Service.deposit( address, this.depositeToMultiSigWalletForm.value.value)

  }

  deployTokenContract(): void {
    const modalRef = this.modalService.open(DeployTokenContractDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.connectedMultiSigWalletAddress = this.multisigWalletAddress;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        // this.loadAll();
      }
    });
  }

  confirmTx(index:number){
    console.log("input index:" , index)
    
    this.web3Service.confirmTx(this.multisigWalletAddress?? "0x0" , Number(index));
  }

  revokeTx(index:number){
    console.log("input index:" , index)
    
    this.web3Service.revokeConfirmation(this.multisigWalletAddress?? "0x0" , Number(index));
  }

  executeTx(index:number){
    console.log("input index:" , index)
    
    this.web3Service.executeTx(this.multisigWalletAddress?? "0x0" , Number(index));
  }

  getMultiSigWalletInfo(){
    if ( this.web3Service.getCurrentMultisigWalletAddress() !=""){
      this.multisigWalletAddress =  this.web3Service.getCurrentMultisigWalletAddress();

      console.log( )
      this.web3Service.getMultisigWalletInfo(this.multisigWalletAddress).then(
        Response => {
          console.log("### response ###" , JSON.stringify(Response) );

          this.owners = Response.owners;
          this.balance = Response.balance;
          this.confirmationsRequired = Response.numConfirmationsRequired.toString();
          this.transactions = Response.transactions;

          this.transactions.forEach(transaction => {

            let result =
            ethers.utils.defaultAbiCoder.decode(
              [ 'bytes32', 'string' ],
              ethers.utils.hexDataSlice(transaction.data, 4)
          );
          console.log("decode result:" , result)

          if ( this.confirmationsRequired == transaction.numConfirmations.toString()){
            this.canExecute.push(true);
          }else {
            this.canExecute.push(false);
          }
          });

          console.log(" can Execute" ,this.canExecute);
          
        }
      );
    }
  }

}
