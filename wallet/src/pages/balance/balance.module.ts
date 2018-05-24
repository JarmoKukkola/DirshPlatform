import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancePage } from './balance';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@NgModule({
  declarations: [
    BalancePage,
  ],
  imports: [
    IonicPageModule.forChild(BalancePage),
  ],
  providers:[
    FirebaseProvider
  ]
})
export class BalancePageModule {}
