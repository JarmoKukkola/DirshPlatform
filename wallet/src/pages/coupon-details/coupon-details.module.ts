import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponDetailsPage } from './coupon-details';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QRCodeModule } from '../../components/qrcode.module';

@NgModule({
  declarations: [
    CouponDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(CouponDetailsPage),
    QRCodeModule
  ],
  providers:[
    SocialSharing
  ],
})
export class CouponDetailsPageModule {}
