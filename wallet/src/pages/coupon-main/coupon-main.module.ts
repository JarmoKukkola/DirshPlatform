import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponMainPage } from './coupon-main';

@NgModule({
  declarations: [
    CouponMainPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponMainPage),
  ],
})
export class CouponMainPageModule {}
