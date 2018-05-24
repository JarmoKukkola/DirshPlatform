import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivePage } from './receive';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { QRCodeModule } from '../../components/qrcode.module';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    ReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivePage),
    QRCodeModule
  ],
  providers:[
    FirebaseProvider,
    SocialSharing
  ]
})
export class ReceivePageModule {}
