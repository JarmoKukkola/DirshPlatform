import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-coupon-main',
  templateUrl: 'coupon-main.html',
})
export class CouponMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  scan(){
    this.navCtrl.push('ReclaimPage'); 
  }

  create(){
    this.navCtrl.push('CreateCouponPage'); 
  }
  
  list(){
    this.navCtrl.push('YourCouponsPage'); 
  }
}
