import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCouponPage } from './create-coupon';
import { WholeBalanceModule } from '../../components/wholeBalance.module';

@NgModule({
  declarations: [
    CreateCouponPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCouponPage),
    WholeBalanceModule
  ],
})
export class CreateCouponPageModule {}
