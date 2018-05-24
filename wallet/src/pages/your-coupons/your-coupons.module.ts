import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourCouponsPage } from './your-coupons';

@NgModule({
  declarations: [
    YourCouponsPage,
  ],
  imports: [
    IonicPageModule.forChild(YourCouponsPage),
  ],
})
export class YourCouponsPageModule {}
