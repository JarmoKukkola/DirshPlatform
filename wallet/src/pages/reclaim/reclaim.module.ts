import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReclaimPage } from './reclaim';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// 
@NgModule({
  declarations: [
    ReclaimPage,
  ],
  imports: [
    IonicPageModule.forChild(ReclaimPage),
  ],
  providers:[
    BarcodeScanner
  ]
})
export class ReclaimPageModule {}
