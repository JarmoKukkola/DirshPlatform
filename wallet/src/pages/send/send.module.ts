import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendPage } from './send';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WholeBalanceModule } from '../../components/wholeBalance.module';

@NgModule({
  declarations: [
    SendPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPage),
    WholeBalanceModule
  ],
  providers:[
   BarcodeScanner,
    FirebaseProvider
  ]
})
export class SendPageModule {}
