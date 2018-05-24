import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'whole-balance',
  templateUrl: 'whole-balance.html'
})
export class WholeBalanceComponent {
  constructor(private firebase:FirebaseProvider){
  }
  @Input() balance:number;
  @Input() token:string;
  @Input() isCoupon:boolean;

  @Output() setAmount = new EventEmitter<number>();

  wholeBalance(){
    let amount;
    if(this.token==this.firebase.defaultTokenName()){
      if(this.isCoupon){
        amount=this.balance-this.firebase.getHigherFee();
      }else{
        amount=this.balance-this.firebase.transactionFee;
      }
    }else{
      amount=this.balance;
    }
    amount=this.firebase.roundDown(amount);
    this.setAmount.emit(amount);
  }
}
