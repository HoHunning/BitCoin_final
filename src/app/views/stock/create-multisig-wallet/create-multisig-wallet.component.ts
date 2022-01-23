import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ethers } from 'ethers';
// import { Web3Service , Transaction} from '../service/web3.service';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'app-create-multisig-wallet',
  templateUrl: './create-multisig-wallet.component.html',
  styleUrls: ['./create-multisig-wallet.component.scss']
})
export class CreateMultisigWalletComponent implements OnInit {

  success = false;
  responseTx :String | null = null;
  response: any | null = null;


  createMultiSigWalletForm = this.fb.group({
    addresses: this.fb.array([
      this.fb.control('')
    ]),
    numbersOfConfirmations: ['']
  });

  constructor(private fb: FormBuilder, private web3Service: ProviderService) { }

  ngOnInit(): void {
  }


  get addresses() {
    return this.createMultiSigWalletForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.control(''));
  }

  createMultiSigWallet(): void {

    const addresses :string[] = this.createMultiSigWalletForm.controls['addresses'].value;
    const numOfCons = this.createMultiSigWalletForm.controls['numbersOfConfirmations'].value;

    console.log(this.createMultiSigWalletForm);
    this.web3Service.deployMultiSigWalletContract(addresses , numOfCons).then( Response => {
      console.log(Response);
      this.responseTx = Response.hash;
      this.success = true;
      this.response = JSON.stringify(Response) ;
    });



  }

}
